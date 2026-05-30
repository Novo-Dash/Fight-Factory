// =============================================================================
// schedule.ts — Configuração da agenda (a parte específica da academia)
// -----------------------------------------------------------------------------
// Fight Factory Jiu Jitsu — Austin, TX (sub-account GHL 7ai3O8KqknYgJu59oYfE)
//
// ⚠️ REGRA-MÃE: o label do programa = `class_type` enviado = nome EXATO do
// calendário no GHL. Os valores de PROGRAM_LABEL abaixo foram copiados
// literalmente dos calendários da sub-account (case/espaço/hífen importam).
// Mudar 1 caractere → o node "Find Calendar" do n8n não acha → falha.
// =============================================================================

// Chaves internas: ASCII, estáveis, nunca exibidas. Use para LÓGICA.
export type Program = 'kids' | 'adults'

// Ordem de exibição dos radios na Etapa 1.
export const PROGRAMS: Program[] = ['adults', 'kids']

// Labels: o texto que o usuário vê no radio E o valor de `class_type`.
// Tem que bater 1:1 com o nome do calendário no GHL.
export const PROGRAM_LABEL: Record<Program, string> = {
  kids: 'Kids BJJ',
  adults: 'Adults BJJ All Levels',
}

// Descrição curta exibida abaixo do label no radio (apenas UI, não vai no payload).
export const PROGRAM_HINT: Record<Program, string> = {
  kids: 'Ages 4–12 · fundamentals, focus & fun',
  adults: 'All levels · beginners welcome',
}

// Horários por programa por dia da semana (0=Dom … 6=Sáb), 24h "HH:MM".
// Derivado dos open hours reais dos calendários no GHL (slot 60min, 18:15).
//   Kids BJJ:              Seg, Qua, Qui
//   Adults BJJ All Levels: Seg, Ter, Qua, Qui
const SCHEDULE: Record<Program, Record<number, string[]>> = {
  kids: {
    0: [], 1: ['18:15'], 2: [], 3: ['18:15'], 4: ['18:15'], 5: [], 6: [],
  },
  adults: {
    0: [], 1: ['18:15'], 2: ['18:15'], 3: ['18:15'], 4: ['18:15'], 5: [], 6: [],
  },
}

export const BOOKING_RANGE_DAYS = 14 // janela de agendamento (allowBookingFor no GHL)
export const BUFFER_HOURS = 5 // antecedência mínima de um slot
export const ACADEMY_TIMEZONE = 'America/Chicago'

export const ACADEMY_ADDRESS = {
  name: 'Fight Factory Jiu Jitsu',
  street: '9607 Research Blvd, Suite 675',
  city: 'Austin, TX 78759',
  phone: '(512) 905-0644',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJeU0gUonMRIYR-Sw3F407_zo',
}

// -----------------------------------------------------------------------------
// Helpers de data/hora (lógica idêntica entre academias)
// -----------------------------------------------------------------------------

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function addDays(d: Date, days: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + days)
  return r
}

/** Janela agendável: de hoje até hoje + BOOKING_RANGE_DAYS (datas locais). */
export function getBookingWindow(): { min: Date; max: Date } {
  const min = startOfDay(new Date())
  return { min, max: addDays(min, BOOKING_RANGE_DAYS) }
}

/**
 * Horários do dia para o programa, filtrando slots a menos de BUFFER_HOURS de
 * agora. Comparação em horário local (consistente com o resto do fluxo).
 */
export function getTimesForDay(program: Program, date: Date): string[] {
  const slots = SCHEDULE[program]?.[date.getDay()] ?? []
  const now = new Date()
  const bufferMs = BUFFER_HOURS * 60 * 60 * 1000
  return slots.filter((slot) => {
    const [h, m] = slot.split(':').map(Number)
    const slotDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0)
    return slotDate.getTime() - now.getTime() >= bufferMs
  })
}

/** Data agendável: dentro da janela E com pelo menos um horário disponível. */
export function isDateBookable(program: Program, date: Date): boolean {
  const { min, max } = getBookingWindow()
  const d = startOfDay(date)
  if (d.getTime() < min.getTime() || d.getTime() > max.getTime()) return false
  return getTimesForDay(program, date).length > 0
}

/**
 * "18:15" → "6:15 PM". É ESTA função que produz o `appointment_time`
 * (12h + AM/PM) — o formato que o Luxon do workflow n8n consegue parsear.
 * NUNCA enviar 24h ("18:15") para o webhook.
 */
export function formatTimeLabel(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  let hour = h % 12
  if (hour === 0) hour = 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

/**
 * Data local → "YYYY-MM-DD". NÃO usar toISOString() (UTC desloca o dia).
 * É o que vai no `appointment_date` do Webhook 2.
 */
export function isoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** "Monday, June 2" — exibição. */
export function formatDateLong(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

/** "June 2026" — exibição do cabeçalho do calendário. */
export function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

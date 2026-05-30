# Calendário de Agendamento de Aula Trial — Especificação para Replicação

> **Como usar este documento:** entregue este markdown para a IA ao criar a
> landing page de uma **nova academia**. Ele descreve a lógica completa do
> fluxo de agendamento e, principalmente, o **contrato do webhook n8n
> compartilhado** que NÃO pode ser quebrado. Os valores específicos de cada
> academia estão marcados como `{{PLACEHOLDER}}` e listados no checklist no
> final — só esses mudam entre academias; a lógica é idêntica.

---

## 1. Objetivo

Modal de 2 etapas que captura um lead e agenda uma aula trial. Ele:

1. Captura o lead (nome, e-mail, telefone, programa) → **Webhook 1**.
2. Deixa o usuário escolher data e horário num calendário → **Webhook 2**.
3. Dispara um evento de conversão no Google Tag Manager.

O **Webhook 2 alimenta um workflow n8n compartilhado por TODAS as academias**.
Esse workflow é "burro" e stateless: ele só lê os campos do payload e usa o
`location_id` para descobrir qual conta/calendários do GHL usar. Cada landing
page é responsável por entregar o payload no formato exato esperado. Quebrar o
formato quebra o agendamento.

---

## 2. Fluxo do usuário

```
[CTA "Agendar aula"] → abre Modal
   │
   ├─ Etapa 1 — Seus dados
   │     Campos: nome completo, e-mail, telefone, programa (radio)
   │     Validação: nome ≥ 2 chars, e-mail válido, telefone válido, programa escolhido
   │     Botão "Continuar" (desabilitado até válido)
   │        └─► dispara WEBHOOK 1 (uma vez por sessão) → vai para Etapa 2
   │
   ├─ Etapa 2 — Escolha data e horário
   │     Calendário (janela de N dias, datas sem horário ficam desabilitadas)
   │     Lista de horários do dia/programa selecionado (filtrada por buffer)
   │     Botão "Confirmar" (desabilitado sem data+hora)
   │        └─► dispara EVENTO GTM + WEBHOOK 2 → tela de Sucesso
   │
   └─ Sucesso — confirmação + endereço da academia + botão "Concluir"
         └─► reseta o estado (nova sessão pode gerar novo lead)
```

Regras de UX inegociáveis:

- **Envio de webhook é fire-and-forget**: falha/lentidão de webhook **nunca**
  bloqueia o usuário nem mostra erro. A tela de sucesso aparece sempre.
- **Dedupe do Webhook 1**: dispara **uma vez por sessão de booking**, mesmo se
  o usuário voltar para a Etapa 1 e avançar de novo. Reseta ao concluir.
- Modal: fecha no Esc, trava o scroll do body, fecha ao clicar fora, render
  via portal, atributos ARIA de dialog.

---

## 3. Os dois webhooks

### 3.1 Webhook 1 — Lead (destino: LeadConnector / GoHighLevel)

- **Quando**: transição Etapa 1 → Etapa 2.
- **Destino**: URL de "Inbound Webhook" do GHL, **única por academia**
  (`{{LEAD_WEBHOOK_URL}}`). Não tem URL de teste separada — é a mesma sempre.
- 🔑 **O `location_id` está embutido nesta URL.** Formato do LeadConnector:
  `https://services.leadconnectorhq.com/hooks/<LOCATION_ID>/webhook-trigger/<uuid>`
  — o `location_id` é o **segmento logo após `/hooks/`**. Não precisa
  procurar em outro lugar: pega o `{{LOCATION_ID}}` daqui. É **o mesmo
  valor** que vai no `location_id` do Webhook 2 (§3.2) e na constante
  `GHL_LOCATION_ID` do código (§6) — defina uma vez, derive a URL do
  Webhook 1 a partir dele para nunca divergir.
- **Método**: `POST`, `Content-Type: application/json`.
- **Payload** (este é flexível — o mapeamento dos campos é feito na UI do GHL;
  mande cru e formatado para a academia escolher o que usar):

```json
{
  "event": "lead_captured",
  "name": "<nome completo digitado>",
  "firstName": "<primeiro token do nome>",
  "lastName": "<resto do nome>",
  "email": "<email>",
  "phone": "<telefone como digitado, ex: (555) 555-5555>",
  "phoneE164": "<+1XXXXXXXXXX — dígitos normalizados>",
  "program": "<chave interna do programa, ASCII>",
  "submittedAt": "<ISO timestamp>",
  "source": "{{SOURCE_LABEL}}",

  "utm_source": "<se presente na URL de chegada>",
  "utm_medium": "<...>",
  "utm_campaign": "<...>",
  "utm_term": "<...>",
  "utm_content": "<...>",
  "gclid": "<Google Ads click id>",
  "fbclid": "<Meta click id>",
  "gad_source": "<...>",
  "wbraid": "<...>",
  "gbraid": "<...>"
}
```

> **Atribuição (UTM + click IDs):** os campos do segundo bloco são a **marketing
> attribution** capturada da URL de chegada (ver §4.3). Vão **só no Webhook 1**
> (o CRM/GHL é onde a atribuição vive; os campos são mapeados na UI do GHL).
> São **opcionais por natureza**: só aparecem as chaves que vieram na URL —
> visita sem campanha (tráfego direto) não envia nenhuma. **Não vão no
> Webhook 2** para não tocar no contrato crítico do n8n (§3.2).

### 3.2 Webhook 2 — Agendamento (destino: workflow n8n compartilhado) — ⚠️ CONTRATO CRÍTICO

- **Quando**: clique em "Confirmar" (data + hora escolhidas).
- **Destino (FIXO — produção, igual para TODAS as academias):**
  `https://n8n.novodash.com/webhook/landing-page-calendar`
  - O workflow já está **validado e em produção**. Academia nova aponta
    direto para esta URL — **não usar a de teste**.
  - O que muda por academia **não é a URL** — é o `location_id` no payload.
    O workflow é único e roteia pela `location_id`. **Não criar webhook novo
    por academia.**
  - (A URL de teste `…/webhook-test/…` só é relevante se um dia for
    **alterar o próprio workflow compartilhado** — não para subir uma
    academia nova.)
- **Método**: `POST`, `Content-Type: application/json`.
- **Payload — schema EXATO esperado pelo workflow compartilhado**:

```json
{
  "parent_name": "<nome>",
  "child_name": "<nome>",
  "email": "<email>",
  "phone": "<telefone como digitado>",
  "class_type": "<NOME EXATO do calendário no GHL>",
  "location_id": "{{LOCATION_ID}}",
  "stage": "appointment_selected",
  "appointment_date": "YYYY-MM-DD",
  "appointment_time": "h:mm AM/PM",
  "source": "{{SOURCE_LABEL}}"
}
```

**O que o workflow n8n faz com cada campo (e por que o formato importa):**

| Campo | Uso no workflow | Regra que NÃO pode quebrar |
|---|---|---|
| `location_id` | Busca a academia no Supabase (`academy_info_list`) → pega auth do GHL, fuso, etc. | Tem que ser o `location_id` da sub-account GHL daquela academia. |
| `class_type` | `Find Calendar` faz **igualdade exata de string** (`calendar.name === class_type`, case-sensitive) contra os calendários do GHL. | **DEVE ser idêntico ao nome do calendário no GHL** — incluindo maiúsculas, espaços e tipo de hífen. Diferença de 1 caractere = "No calendar matching" e o fluxo falha. |
| `appointment_date` | Combinado com a hora no node "Build ISO Datetime" (Luxon `fromFormat`, formato `yyyy-MM-dd h:mm a`). | **`YYYY-MM-DD`**, data **local** (não usar `Date.toISOString()` — o UTC desloca o dia). |
| `appointment_time` | Idem acima. | **12 horas com AM/PM**, ex: `5:00 PM`, `6:00 AM`. **NUNCA 24h** (`17:00`) — o token `h` do Luxon não aceita >12 sem `AM/PM` → erro `unparsable`. |
| `parent_name` | `Upsert Contact` faz `parent_name.trim().split(/\s+/)` → `firstName` + `lastName` do contato no GHL. | **Obrigatório e não-nulo.** Se ausente, `undefined.trim()` **quebra o workflow inteiro**. Form com nome único → mandar o mesmo nome aqui. |
| `child_name` | Título do appointment = `"<class_type> - <child_name>"`. | Obrigatório. Form com nome único → mandar o mesmo valor de `parent_name`. |
| `email`, `phone` | `Upsert Contact` (contato no CRM). | `phone` no formato exibido (`(555) 555-5555`) é aceito. |
| `source` | `Upsert Contact` grava como origem do contato. | String livre; usar `{{SOURCE_LABEL}}`. |
| `stage` | **Ignorado pelo workflow.** Mantido só por consistência com o payload de referência. | Valor fixo `"appointment_selected"`. |

**Resposta do workflow (sucesso)**: JSON com `success`, `appointmentId`,
`contactId`, `academy`, `calendar`, `startTime`. Não bloqueie a UI esperando —
fire-and-forget; a resposta serve para depuração no log do n8n.

**Comportamento do workflow** (contexto, não precisa replicar — é do lado n8n):
recebe → acha academia → lista calendários → casa pelo `class_type` → monta
datetime no fuso da academia → upsert do contato → **cancela appointments
ativos anteriores do contato** (regra: 1 contato = 1 appointment ativo) → cria
o novo appointment confirmado.

---

## 4. Estrutura de código (módulos e responsabilidades)

Stack de referência: React + TypeScript + Vite. Adapte os nomes, mantenha as
responsabilidades e os contratos.

| Módulo | Responsabilidade |
|---|---|
| `BookingProvider` | Context + estado de aberto/fechado. Intercepta cliques em CTAs (ex: `<a href="#schedule">`) e abre o modal sem precisar alterar cada botão. |
| `BookingModal` | Casca do modal (portal, Esc, scroll-lock, click-fora, ARIA). |
| `BookingForm` | Máquina de estados: `step` (1 / 2 / "success") + `data`. Faz o dedupe do Webhook 1 (`leadSent` ref), chama os webhooks e o evento GTM nos pontos certos, reseta no fim. |
| `Step1Details` | Form da etapa 1 + validação. Renderiza os radios de programa a partir do mapa de labels. |
| `Step2Schedule` | Calendário + lista de horários. |
| `Calendar` | Grid de mês, navegação, desabilita datas fora da janela / sem horário. Genérico (só usa o tipo `Program` + helper de "data agendável"). |
| `Success` | Confirmação + endereço + botão concluir. |
| `schedule` | **Config específica da academia** + tipos + helpers de data/hora. (ver §5) |
| `webhook` | Transporte dos 2 webhooks + montagem dos payloads. (ver §6) |
| `attribution` | Captura UTM + ad click IDs da URL, persiste na sessão, devolve pro Webhook 1. (ver §4.3) |
| `analytics` | `pushEvent(event)` → `window.dataLayer`. (ver §7) |

Pontos de disparo (em `BookingForm`):

- `handleNext()` (Etapa 1 → 2): se `!leadSent` → marca e chama Webhook 1.
- `handleConfirm()` (Confirmar): `pushEvent("trial_booked")` **e** Webhook 2.
- `handleDone()` (Concluir): reseta `data` + `step` + `leadSent`.

### 4.1 Dois pontos de entrada, UM componente (regra arquitetural)

O fluxo é exposto em **dois lugares**, e os dois renderizam o **mesmo
`<BookingForm />`** — nunca duplicar a lógica:

1. **Modal** na página principal (`BookingModal` → `<BookingForm />`),
   aberto pelos CTAs.
2. **Página dedicada `/book`** (`BookPage` → `<BookingForm />`), rota
   própria via react-router.

> ⚠️ **Regra inegociável:** modal e `/book` **compartilham o mesmo
> componente de formulário/calendário**. É proibido criar um segundo
> formulário/calendário para a página. Editar o fluxo deve refletir nos
> dois automaticamente. Se um dia divergirem, o bug de "editei o modal e o
> /book continuou velho" volta.

Especificação da página `/book`:

- Rota `/book` (react-router). Pode ser usada como destino direto de
  anúncios/links.
- **Sem navegação**: SEM header de menu, footer, ou qualquer link/botão de
  volta para o site. Nada de navegação para fora.
- **Mas com identidade visual** (não deixar "seca"): a página deve seguir o
  visual elegante da landing — **logo do cliente** (decorativa, NÃO é link)
  + **background estilizado** na paleta da marca. Referência atual: paleta
  clara (`--bg`), glow vermelho sutil + grid hairline com máscara radial,
  card branco (`--paper`) com borda fina e **filete vermelho no topo**
  (motivo de acento da marca), e um "eyebrow" (mono/uppercase + dot
  pulsante) abaixo do card. Adapte à identidade de cada academia, mas
  **nunca entregue uma página preta/vazia** — ela tem que ter o mesmo
  acabamento da página principal, só que focada no formulário.
- Mesmo comportamento do modal (mesmos webhooks, mesmo evento GTM, mesma
  validação). Ao concluir, o form reseta para a Etapa 1 (não redireciona,
  já que não há "site" para onde voltar nessa página).
- **Deploy (OBRIGATÓRIO)**: `/book` é rota client-side (react-router). Em
  host estático (Vercel/Netlify/etc.) **sem fallback de SPA**, acessar
  `/book` direto ou dar F5 nela retorna **404** — `/` funciona, `/book`
  não. Tem que haver rewrite de todas as rotas para `index.html`. Na
  Vercel, **commitar um `vercel.json`** na raiz:

  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

  O filesystem é checado antes do rewrite, então assets reais
  (`/assets/*`, imagens, favicon) continuam servidos normalmente — só
  rotas inexistentes caem no `index.html`. Sem isso, o `/book` quebra
  **só em produção** (no dev do Vite funciona, porque o dev server já tem
  history fallback) — pega quem só testa local.

### 4.2 Pré-preenchimento via URL (links do GHL)

A Etapa 1 é pré-preenchida a partir da query string, para links enviados
pelo GHL com merge fields do contato:

```
.../book?full_name={{contact.name}}&email={{contact.email}}&phone={{contact.phone}}
```

Mapeamento: `full_name → name`, `email → email`, `phone → phone`. Vale para
o modal **e** para `/book` (mesmo `BookingForm`). Regras obrigatórias
(robustez com GHL):

- **Merge tag não resolvido**: se o valor contém `{{` ou `}}` (link aberto
  antes do GHL substituir), **ignorar** — não pré-preencher com o literal.
- **Telefone E.164**: GHL manda `+15555555555`; remover o código de país
  (11 dígitos começando com `1` → tira o `1`) **antes** de formatar, senão
  o formatador corta os dígitos errados.
- **Leitura única** no mount (lazy init do estado) — edições do usuário
  sempre vencem; não sobrescrever a cada render.
- `program` não vem por URL (só os 3 campos) — usuário ainda escolhe.

### 4.3 Captura de atribuição (UTM + ad click IDs)

A landing captura a **marketing attribution** da URL de chegada (ex: clique de
anúncio: `/?utm_source=facebook&utm_medium=cpc&utm_campaign=trial-maio`) e a
anexa ao **Webhook 1** (§3.1) para o lead entrar no CRM já atribuído. Lógica
idêntica entre academias.

Parâmetros capturados (10): as **5 UTMs padrão** (`utm_source`, `utm_medium`,
`utm_campaign`, `utm_term`, `utm_content`) **+ os ad click IDs** (`gclid`,
`fbclid`, `gad_source`, `wbraid`, `gbraid`) usados pra conversão offline.

Regras obrigatórias (módulo `attribution`):

- **Captura no carregamento, antes da navegação SPA** poder limpar a query
  string — chamar `captureAttribution()` uma vez no boot do app (`main.tsx`),
  **não** dentro de um componente que monta depois de uma rota trocar.
- **Persistência na sessão (`sessionStorage`, first-touch):** a primeira visita
  da sessão que trouxer **qualquer** param vence; navegações seguintes não
  sobrescrevem. Sobrevive à navegação interna e ao reset do form. Some quando a
  aba fecha → visita de volta semanas depois não carrega campanha velha.
- **First-touch sem clobber:** só grava se (a) ainda não há nada salvo **e**
  (b) a URL atual traz ≥ 1 param. Assim tráfego direto / navegação interna não
  apaga uma atribuição real capturada antes na sessão.
- **Mesma higiene do prefill (§4.2):** ignorar merge tags não resolvidas (valor
  com `{{` ou `}}`) e valores vazios — só entram chaves com valor de verdade.
- **Só Webhook 1.** Atribuição é coisa de CRM; o GHL mapeia os campos na UI.
  **Não** mandar no Webhook 2 pra não mexer no contrato crítico do n8n (§3.2).
- **Falha de storage é silenciosa** (modo privado / bloqueado): cair pra leitura
  direta da URL, nunca quebrar o fluxo.

---

## 5. `schedule` — configuração da agenda (a parte que muda por academia)

Tipos e mapa de labels. **Os valores de `PROGRAM_LABEL` são o que vai no
`class_type` e DEVEM ser idênticos aos nomes dos calendários no GHL.**

```ts
// Chaves internas: ASCII, estáveis, nunca exibidas. Use para LÓGICA.
export type Program = "{{prog_key_1}}" | "{{prog_key_2}}" | "...";

// Labels: o texto que o usuário vê no radio E o valor de class_type.
// Tem que bater 1:1 com o nome do calendário no GHL.
export const PROGRAM_LABEL: Record<Program, string> = {
  "{{prog_key_1}}": "{{Nome Exato Calendário GHL 1}}",
  "{{prog_key_2}}": "{{Nome Exato Calendário GHL 2}}",
};

// Horários por programa por dia da semana (0=Dom ... 6=Sáb), 24h "HH:MM".
const SCHEDULE: Record<Program, Record<number, string[]>> = {
  "{{prog_key_1}}": { 0: [], 1: ["{{HH:MM}}"], /* ... */ 6: [] },
};

export const BOOKING_RANGE_DAYS = {{N}};   // janela de agendamento (dias)
export const BUFFER_HOURS = {{H}};         // antecedência mínima de um slot
export const ACADEMY_ADDRESS = { street: "{{...}}", city: "{{...}}", mapsUrl: "{{...}}" };
```

Helpers (lógica idêntica entre academias):

- `getBookingWindow()` → `{ min: hoje, max: hoje + BOOKING_RANGE_DAYS }`.
- `getTimesForDay(program, date)` → horários do dia, **filtrando slots a menos
  de `BUFFER_HOURS` de agora**.
- `isDateBookable(program, date)` → dentro da janela **e** tem horário.
- `formatTimeLabel("18:00")` → `"6:00 PM"` — **é esta função que produz o
  `appointment_time`** (12h + AM/PM). É o que satisfaz o Luxon do n8n.
- `formatDateLong`, `formatMonthYear` → exibição.
- Para `appointment_date`: gerar `YYYY-MM-DD` a partir de **ano/mês/dia
  locais** (não `toISOString()`).

---

## 6. `webhook` — transporte e montagem

```ts
// FIXO para todas as academias — não parametrizar.
const N8N_ORIGIN = "https://n8n.novodash.com";
// Workflow já validado → produção direto. ("webhook-test" só se for
// mexer no próprio workflow compartilhado um dia.)
const N8N_PATH = "webhook";
const BOOKING_WEBHOOK_URL = `${N8N_ORIGIN}/${N8N_PATH}/landing-page-calendar`;

// location_id definido UMA vez. A URL do Webhook 1 é derivada dele
// (o location_id é o segmento após /hooks/ — ver §3.1), então nunca
// divergem entre os dois webhooks.
const GHL_LOCATION_ID = "{{LOCATION_ID}}";
const LEAD_WEBHOOK_URL = `https://services.leadconnectorhq.com/hooks/${GHL_LOCATION_ID}/webhook-trigger/{{LEAD_WEBHOOK_UUID}}`;
```

`post(url, payload)` — regras:

- `fetch` `POST` JSON, `keepalive: true` (entrega mesmo se o modal fechar).
- **Nunca lança**: erros são engolidos para não bloquear o usuário.
- **Loga o resultado**: `console.warn` em falha (status ≠ 2xx ou erro de
  rede) — em dev **e** prod (webhook falho = lead/agendamento perdido);
  `console.info` em sucesso só em dev (`import.meta.env.DEV`).
- Atenção: erro de CORS no console **não prova** que não chegou — o servidor
  pode ter recebido e o browser só não conseguiu ler a resposta. Fonte da
  verdade = log de execução do n8n.

Helpers de payload: `splitName(full)` → `{first,last}`; `toE164(phone)` →
`+1` + 10 dígitos (ou os dígitos crus); `isoDate(date)` → `YYYY-MM-DD` local.

Montagem: `sendLeadWebhook` (§3.1) e `sendBookingWebhook` (§3.2) exatamente
com os schemas acima. `sendLeadWebhook` faz `...getAttribution()` (do módulo
`attribution`, §4.3) no payload — espalha as chaves UTM/click-ID no topo
(facilita o mapeamento no GHL); vazio quando a visita não teve campanha.

---

## 7. Evento GTM

`analytics.pushEvent(event)`:

```ts
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event });
```

Disparar `pushEvent("trial_booked")` no `handleConfirm` (junto do Webhook 2).
Não instalar/gerenciar o container do GTM no código — só empurrar o evento; o
container é tratado fora. Inicializar o array com `|| []` é seguro mesmo sem
GTM presente (o evento fica na fila).

---

## 8. Regras de ouro — armadilhas que JÁ quebraram o fluxo

Cada item abaixo foi um bug real. A IA deve garantir que nenhum se repita:

1. **Hora em 24h** (`"17:00"`) no `appointment_time` → Luxon `unparsable`.
   ✅ Sempre 12h com AM/PM via `formatTimeLabel` (`"5:00 PM"`).
2. **`class_type` ≠ nome do calendário no GHL** (ex: travessão `–` vs hífen
   `-`, maiúscula errada, espaço a mais) → `Find Calendar` não acha → falha.
   ✅ `PROGRAM_LABEL` deve ser **cópia literal** dos nomes dos calendários do
   GHL. Padronizar tudo (label do form = class_type = nome no GHL).
3. **`parent_name`/`child_name` ausentes** (form de nome único que "ignorou"
   esses campos) → `Upsert Contact` faz `undefined.trim()` → workflow quebra.
   ✅ Sempre enviar os dois. Form com 1 nome → duplica o mesmo valor.
4. **`appointment_date` via `toISOString()`** → desloca o dia por causa do
   fuso (UTC). ✅ Montar `YYYY-MM-DD` com data **local**.
5. **`source` removido** → contato entra no CRM sem origem. ✅ Sempre enviar.
6. **Bloquear a UI no `await` do webhook** → trava/assusta o usuário.
   ✅ Fire-and-forget sempre.
7. **CORS em dev** com `Content-Type: application/json` (preflight): se o n8n
   reclamar, ativar **"Allowed Origins (CORS)"** no node Webhook do n8n
   (`*` para dev). Não é bug do código. (LeadConnector normalmente não precisa.)
8. **Duplicar o formulário** entre o modal e a página `/book` → divergem com
   o tempo (edita um, esquece o outro). ✅ Modal e `/book` renderizam o
   **mesmo** `<BookingForm />`. Nunca criar um segundo. (ver §4.1)
9. **`/book` 404 em produção** (SPA sem fallback): deploy "passa", `/`
   funciona, mas `/book` direto/F5 dá 404. No dev do Vite funciona →
   engana quem só testa local. ✅ Commitar `vercel.json` com rewrite de
   todas as rotas para `index.html` **antes** do deploy. (ver §4.1)

---

## 9. Validação

- **n8n já está em produção e validado** — academia nova aponta direto
  para a URL de produção (§3.2). Não há etapa de "trocar test → prod" nem
  necessidade de "Listen for test event" para subir uma academia.
- **Validar ponta a ponta** (recomendado a cada academia nova): fazer um
  agendamento real e conferir a execução no n8n — deve chegar até
  "Respond Success" (contato criado/atualizado + appointment criado no
  calendário certo, com título `"<class_type> - <nome>"`). Depois,
  apagar o contato/appointment de teste no GHL.
- A URL de teste (`…/webhook-test/…` + "Listen for test event") **só** é
  usada se for **alterar o próprio workflow compartilhado** — aí sim
  testa a mudança no test antes de aplicar em produção.

---

## 10. Checklist de configuração por academia (preencher os placeholders)

| Placeholder | O que é | Onde obter |
|---|---|---|
| `{{LOCATION_ID}}` | ID da sub-account da academia no GHL | **Pegar da URL do Webhook 1**: segmento após `/hooks/` no Inbound Webhook do LeadConnector (ver §3.1). Mesma string usada no Webhook 2. |
| `{{LEAD_WEBHOOK_UUID}}` | Parte final (trigger id) da URL do Inbound Webhook do GHL | GHL → Inbound Webhook (o `<uuid>` depois de `/webhook-trigger/`) |
| ~~webhook n8n~~ | **NÃO é placeholder** — fixo: `https://n8n.novodash.com/webhook/landing-page-calendar`. Igual para todas as academias. | — |
| `{{Nomes dos calendários}}` | Nome **exato** de cada calendário no GHL | GHL → Calendars (copiar literal) |
| `{{prog_key_*}}` | Chaves internas ASCII dos programas | Você define (ex: `adults`, `kids-4-7`) |
| `SCHEDULE` | Dias/horários de cada programa + fuso | Academia |
| `{{N}}` `{{H}}` | Janela de agendamento / buffer de antecedência | Regra de negócio da academia |
| `{{SOURCE_LABEL}}` | Texto de origem do lead/contato | Ex: `"Landing Page Principal - <Academia>"` |
| `ACADEMY_ADDRESS` | Endereço + link Google Maps | Academia |
| GTM | Container instalado fora do código | Time de tracking |

> Regra-mãe: **o nome do programa no formulário, o `class_type` enviado e o
> nome do calendário no GHL têm que ser exatamente a mesma string.** Defina os
> calendários no GHL primeiro, depois copie os nomes para `PROGRAM_LABEL`.

---

## 11. Critérios de aceite

- [ ] Etapa 1 válida dispara Webhook 1 (1x/sessão) e avança.
- [ ] Chegada com `?utm_source=…` (e/ou click IDs) → o Webhook 1 carrega os
      campos de atribuição (§4.3); tráfego direto não envia nenhum. Persistem
      após navegação interna e reset do form, dentro da mesma sessão.
- [ ] Confirmar dispara `trial_booked` no `dataLayer` **e** Webhook 2.
- [ ] Payload do Webhook 2 bate 100% com o schema da §3.2 (nomes e formatos).
- [ ] `appointment_time` em `h:mm AM/PM`; `appointment_date` em `YYYY-MM-DD`
      local; `class_type` idêntico ao calendário no GHL.
- [ ] Execução n8n chega a "Respond Success" com o appointment criado no
      calendário correto.
- [ ] Falha de webhook não bloqueia nem mostra erro ao usuário (mas loga).
- [ ] Rota `/book` existe, sem header/footer/nav, e renderiza o **mesmo**
      `<BookingForm />` do modal (zero duplicação).
- [ ] `vercel.json` commitado: `/book` aberto direto **e com F5 em
      produção** carrega (não 404). Assets/home seguem normais.
- [ ] Webhook 2 aponta para a URL de **produção** do n8n (sem `-test`);
      execução real chega a "Respond Success".
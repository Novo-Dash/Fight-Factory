// =============================================================================
// attribution.ts — Captura de marketing attribution (UTM + ad click IDs)
// -----------------------------------------------------------------------------
// Captura os params da URL de chegada, persiste na sessão (first-touch) e
// devolve para o Webhook 1 (lead → GHL). NUNCA vai no Webhook 2.
// Lógica idêntica entre academias.
// =============================================================================

// 5 UTMs padrão + ad click IDs usados para conversão offline.
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'gad_source',
  'wbraid',
  'gbraid',
] as const

const STORAGE_KEY = 'ff_attribution'

/** Lê os params válidos da URL atual (ignora merge tags não resolvidas e vazios). */
function readFromUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value && !value.includes('{{') && !value.includes('}}')) {
      out[key] = value
    }
  }
  return out
}

/**
 * Captura no boot do app (main.tsx), ANTES de a navegação SPA limpar a query.
 * First-touch sem clobber: só grava se ainda não há nada salvo E a URL traz
 * ≥ 1 param. Falha de storage é silenciosa (modo privado / bloqueado).
 */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return // first-touch: não sobrescreve
    const fromUrl = readFromUrl()
    if (Object.keys(fromUrl).length === 0) return // sem params → não grava (tráfego direto)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    // storage indisponível — ignora, getAttribution() cai pra leitura direta da URL
  }
}

/**
 * Devolve a atribuição persistida (ou, em fallback, a da URL atual).
 * Só contém as chaves que realmente vieram — visita sem campanha → {}.
 */
export function getAttribution(): Record<string, string> {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // fall-through para leitura direta da URL
  }
  return readFromUrl()
}

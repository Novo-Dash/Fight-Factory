// =============================================================================
// analytics.ts — Evento GTM
// -----------------------------------------------------------------------------
// Só empurra o evento para o dataLayer. O container do GTM é instalado fora do
// código (no index.html). Inicializar com `|| []` é seguro mesmo sem GTM
// presente — o evento fica na fila até o container carregar.
// =============================================================================

export function pushEvent(event: string): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event })
}

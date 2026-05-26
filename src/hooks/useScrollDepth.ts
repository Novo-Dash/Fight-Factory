import { useEffect, useRef } from 'react'

const THRESHOLDS = [25, 50, 75, 90]

export function useScrollDepth() {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      THRESHOLDS.forEach((threshold) => {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', { depth: threshold })
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

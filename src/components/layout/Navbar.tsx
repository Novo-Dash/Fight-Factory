import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'

export function Navbar() {
  const { openModal } = useModal()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCTA() {
    openModal()
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout')
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 md:h-[72px]"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" aria-label="Fight Factory Jiu-Jitsu" className="flex items-center shrink-0">
          <img
            src="/images/FONTE.webp"
            alt="Fight Factory Jiu-Jitsu"
            className="h-10 md:h-11 w-auto object-contain"
            style={{
              filter: scrolled ? 'brightness(0)' : 'brightness(0) invert(1)',
              transition: 'filter 0.35s ease',
            }}
          />
        </a>

        {/* Center badge — desktop only */}
        <div className="hidden md:flex items-center gap-1.5 text-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.545 5.09H13L9.545 7.59L10.91 12L7 9.41L3.09 12L4.455 7.59L1 5.09H5.455L7 1Z" fill="#FBBC04" />
          </svg>
          <span
            className="text-xs tracking-wide"
            style={{ color: scrolled ? '#666666' : 'rgba(255,255,255,0.8)', transition: 'color 0.35s ease' }}
          >
            5.0 · 96 Google reviews
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-[1.02] transition-all duration-200 min-h-[40px] min-w-[44px] cursor-pointer shrink-0"
          style={{
            background: scrolled
              ? 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)'
              : 'rgba(255,255,255,0.15)',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            backdropFilter: scrolled ? 'none' : 'blur(8px)',
            transition: 'background 0.35s ease, border 0.35s ease',
          }}
        >
          Book Free Trial
        </button>

      </div>
    </header>
  )
}

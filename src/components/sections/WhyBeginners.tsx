import { useModal } from '../../hooks/useModal'
import { TrianglePattern } from '../ui/TrianglePattern'

const benefits = [
  'Learn fundamentals',
  'Train in a welcoming environment',
  'Dedicated instructor during your first classes',
  'No experience or athletic background required',
  'Build confidence before joining advanced groups',
]

export function WhyBeginners() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* Left — content */}
          <div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 28, height: 2, background: '#0A0A0A', borderRadius: 9999 }} />
              <span style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#888888',
              }}>
                Why Fight Factory
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)',
                letterSpacing: '0.01em',
                lineHeight: '1.05',
                textTransform: 'uppercase',
                color: '#0A0A0A',
              }}
              className="mb-6"
            >
              Why do beginners choose Fight Factory?
            </h2>

            <p style={{ color: '#666666', fontSize: '1rem', lineHeight: '1.8' }} className="mb-8">
              Fight Factory offers a beginner onboarding system unique in Austin: you start with 5 introductory classes in a separate group from the regular classes, designed to build confidence in your first steps:
            </p>

            {/* Benefits list */}
            <ul className="mb-10 flex flex-col" style={{ borderTop: '1px solid #E4E4E4' }}>
              {benefits.map((b, i) => (
                <li
                  key={b}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: '1px solid #E4E4E4' }}
                >
                  <span style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    color: '#CCCCCC',
                    minWidth: '1.75rem',
                  }}>
                    0{i + 1}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#0A0A0A" />
                    <path d="M5.5 9.25L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: '#1A1A1A', fontSize: '0.9375rem', fontWeight: 500 }}>{b}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)',
                fontSize: '0.9375rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              }}
            >
              Book a free trial class
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center items-center">
            <div
              className="relative"
              style={{
                width: '310px',
                aspectRatio: '9/19.5',
                background: 'linear-gradient(160deg, #2a2a2a 0%, #0d0d0d 100%)',
                borderRadius: '44px',
                padding: '10px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Side buttons — volume */}
              <div style={{ position: 'absolute', left: '-3px', top: '90px', width: '3px', height: '28px', background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
              <div style={{ position: 'absolute', left: '-3px', top: '128px', width: '3px', height: '28px', background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
              {/* Side button — power */}
              <div style={{ position: 'absolute', right: '-3px', top: '110px', width: '3px', height: '48px', background: '#1a1a1a', borderRadius: '0 2px 2px 0' }} />

              {/* Screen */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: '36px', background: '#000' }}
              >
                {/* Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                >
                  <source src="/videos/2.webm" type="video/webm" />
                  <source src="/videos/2.mp4" type="video/mp4" />
                </video>

                {/* Dynamic island */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '72px',
                    height: '20px',
                    background: '#000',
                    borderRadius: '12px',
                    zIndex: 10,
                  }}
                />

                {/* Bottom home indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.35)',
                    borderRadius: '9999px',
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

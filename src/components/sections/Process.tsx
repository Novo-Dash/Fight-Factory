import { useState } from 'react'
import { useModal } from '../../hooks/useModal'

const steps = [
  {
    number: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    text: 'Click the button and fill out the form.',
  },
  {
    number: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 6h8M6 12h12M8 18h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    text: 'Choose your class type and pick a date & time on the calendar.',
  },
  {
    number: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "You'll get email and SMS confirmations with all the details.",
  },
]

export function Process() {
  const { openModal } = useModal()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 9999 }} />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>
                Getting Started
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(2.25rem, 4vw + 0.5rem, 4rem)',
                letterSpacing: '0.01em',
                lineHeight: '1.0',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}
            >
              How to get started?
            </h2>
          </div>
          <button
            onClick={openModal}
            className="shrink-0 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            style={{ background: '#FFFFFF', color: '#0A0A0A', fontSize: '0.875rem' }}
          >
            Schedule Free Trial Class →
          </button>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative" style={{ columnGap: '48px' }}>

{steps.map((step, i) => {
            const active = hovered === i
            return (
              <div
                key={step.number}
                className="relative flex flex-col cursor-default rounded-2xl"
                style={{
                  padding: '28px 24px',
                  transform: active ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, border-color 0.35s ease',
                  background: active ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: active ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >

                {/* Step circle + icon */}
                <div className="flex items-center gap-4 mb-8" style={{ position: 'relative' }}>
                  {/* Glow behind icon */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
                      opacity: active ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      top: '-12px',
                      left: '-12px',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
                      border: active ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.12)',
                      color: active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'all 0.35s ease',
                      transform: active ? 'scale(1.08)' : 'scale(1)',
                      boxShadow: active ? '0 0 0 6px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.4)' : 'none',
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Large decorative number */}
                <div
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: '5rem',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'transparent',
                    WebkitTextStroke: active ? '1px rgba(255,255,255,0.22)' : '1px rgba(255,255,255,0.07)',
                    userSelect: 'none',
                    marginBottom: '12px',
                    transform: active ? 'scale(1.04)' : 'scale(1)',
                    transformOrigin: 'left center',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {step.number}
                </div>

                {/* Divider */}
                <div style={{ position: 'relative', height: '2px', width: '100%', maxWidth: '80px', marginBottom: '20px', overflow: 'hidden', borderRadius: 9999 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)', borderRadius: 9999 }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2))',
                    borderRadius: 9999,
                    transform: active ? 'translateX(0%)' : 'translateX(-100%)',
                    transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} />
                </div>

                {/* Text */}
                <p style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                  lineHeight: '1.65',
                  color: active ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.45)',
                  transition: 'color 0.35s ease',
                  fontWeight: 400,
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                }}>
                  {step.text}
                </p>

                {/* Mobile step connector */}
                {i < 2 && (
                  <div
                    className="md:hidden my-8"
                    style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.12)', marginLeft: '27px' }}
                  />
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

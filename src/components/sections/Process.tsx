import { useState } from 'react'
import { useModal } from '../../hooks/useModal'

const steps = [
  {
    label: 'Step 01',
    title: 'Click the Button',
    text: 'Click the button and fill out the form.',
  },
  {
    label: 'Step 02',
    title: 'Fill Out the Form',
    text: 'Choose your class type and pick a date & time on the calendar.',
  },
  {
    label: 'Step 03',
    title: 'Get Confirmed',
    text: "You'll get email and SMS confirmations with all the details.",
  },
]

export function Process() {
  const { openModal } = useModal()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Background image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="/images/6.webp"
          alt=""
          className="w-full h-full"
          style={{ opacity: 0.22, objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Label */}
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
          Getting Started
        </span>

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-3 mb-12">
          <h2
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw + 0.5rem, 4.5rem)',
              letterSpacing: '0.01em',
              lineHeight: '1.0',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            How to get started?
          </h2>
          <button
            onClick={openModal}
            className="shrink-0 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            style={{ background: '#FFFFFF', color: '#0A0A0A', fontSize: '0.875rem' }}
          >
            Schedule Free Trial Class →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => {
            const isWhite = hovered === i

            return (
              <div
                key={step.label}
                className="rounded-2xl p-8 flex flex-col justify-between cursor-default"
                style={{
                  background: isWhite ? '#FFFFFF' : '#161616',
                  border: isWhite ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  minHeight: '280px',
                  transition: 'background 0.3s ease, border 0.3s ease',
                  transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Step label */}
                <span
                  style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: isWhite ? '#888888' : 'rgba(255,255,255,0.35)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.label}
                </span>

                {/* Title + desc */}
                <div className="mt-10">
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      letterSpacing: '0.01em',
                      textTransform: 'uppercase',
                      lineHeight: '1.1',
                      color: isWhite ? '#0A0A0A' : '#FFFFFF',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: '1.7',
                      color: isWhite ? '#555555' : 'rgba(255,255,255,0.45)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

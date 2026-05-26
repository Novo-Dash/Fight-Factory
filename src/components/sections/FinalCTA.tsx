import { Button } from '../ui/Button'

export function FinalCTA() {
  return (
    <section
      style={{ background: 'linear-gradient(160deg, #1C1C1E 0%, #000000 100%)', padding: '128px 0' }}
      className="text-center"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.15)' }}
        >
          <span className="text-white text-xs tracking-[0.12em] uppercase font-semibold">
            Free trial · No commitment · No experience required
          </span>
        </div>

        <h2
          className="text-white mb-5"
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
            letterSpacing: '0.01em',
            lineHeight: '1.0',
            textTransform: 'uppercase',
          }}
        >
          Start Jiu-Jitsu feeling confident from day one.
        </h2>

        <p
          className="mb-10 mx-auto max-w-lg"
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
            lineHeight: '1.65',
          }}
        >
          Join over 250 students training in Austin's most welcoming BJJ academy.
        </p>

        <Button
          size="lg"
          openModal
          className="bg-white text-[#0A0A0A] hover:bg-[#f0f0f0] text-base font-bold px-10 py-5"
        >
          Book a Free Trial Class →
        </Button>

        <p className="text-white text-sm mt-6 opacity-75">
          ⭐ 5.0 · 96 Google reviews · Austin, TX
        </p>
      </div>
    </section>
  )
}

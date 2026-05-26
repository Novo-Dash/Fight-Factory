import { Button } from '../ui/Button'
import { TrianglePattern } from '../ui/TrianglePattern'

const credentials = [
  {
    icon: 'clock',
    label: 'EXPERIENCE',
    value: '30+ Years on the Mats',
  },
  {
    icon: 'award',
    label: 'BELT RANK',
    value: '5th Degree Black Belt',
  },
  {
    icon: 'trophy',
    label: 'NOTABLE STUDENT',
    value: 'UFC BJJ Champion',
  },
  {
    icon: 'star',
    label: 'ACHIEVEMENT',
    value: 'Champion Trainer',
  },
  {
    icon: 'shield',
    label: 'TEACHING METHOD',
    value: 'Beginner Friendly',
  },
  {
    icon: 'people',
    label: 'LEGACY',
    value: 'Andrew Tackett\'s Coach',
  },
]

function CredIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    clock: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    award: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    trophy: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5h4" /><path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
        <path d="M12 17v4" /><path d="M8 21h8" /><path d="M6 3h12v8a6 6 0 0 1-12 0V3z" />
      </svg>
    ),
    star: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    shield: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    people: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  }
  return <>{map[type]}</>
}

export function Coach() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative' }}>
      <TrianglePattern opacity={0.18} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Section title */}
        <h2
          className="mb-12"
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '0.01em',
            lineHeight: '1.0',
            textTransform: 'uppercase',
          }}
        >
          <span className="text-[#0A0A0A]">Meet the Coach</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">

          {/* Left — photo */}
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
              <img
                src="/images/4.webp"
                alt="Coach Rodrigo Cabral"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>
          </div>

          {/* Right — info */}
          <div className="md:col-span-7 flex flex-col gap-4">

            {/* Header card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)' }}
            >
              <span
                className="inline-block mb-3"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}
              >
                Head Instructor
              </span>
              <h3
                className="text-white mb-4"
                style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '0.01em', lineHeight: '1.0', textTransform: 'uppercase' }}
              >
                Rodrigo Cabral
              </h3>
              {/* Belt badge */}
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  5th Degree Black Belt
                </span>
              </span>
            </div>

            {/* Credentials grid */}
            <div className="grid grid-cols-2 gap-3">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: '#FFFFFF', border: '1px solid #E8E8E8' }}
                >
                  {/* Icon */}
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)' }}
                  >
                    <CredIcon type={c.icon} />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <div style={{ color: '#AAAAAA', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>
                      {c.label}
                    </div>
                    <div className="text-[#0A0A0A] font-semibold leading-tight" style={{ fontSize: '0.8125rem' }}>
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p
              className="text-[#555555]"
              style={{ fontSize: 'clamp(0.9375rem, 0.5vw + 0.875rem, 1rem)', lineHeight: '1.75' }}
            >
              Rodrigo Cabral, with over 30 years on the mats, developed the method that helped shape current UFC BJJ champion Andrew Tackett, combining elite technique with a beginner-friendly teaching style. You can experience his method yourself in a free trial class.
            </p>

            <div>
              <Button size="md" openModal>
                Book Your Free Trial Class →
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

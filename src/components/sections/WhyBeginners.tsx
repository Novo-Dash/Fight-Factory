import { useModal } from '../../hooks/useModal'
import { TrianglePattern } from '../ui/TrianglePattern'

const benefits = [
  {
    number: '01',
    tag: 'CURRICULUM',
    title: 'Learn fundamentals',
    desc: 'Structured curriculum built for zero-experience students.',
  },
  {
    number: '02',
    tag: 'ENVIRONMENT',
    title: 'Welcoming atmosphere',
    desc: 'Train in a supportive environment designed to make you feel at home.',
  },
  {
    number: '03',
    tag: 'COACHING',
    title: 'Dedicated instructor',
    desc: 'Personalized guidance from an experienced coach during your first classes.',
  },
  {
    number: '04',
    tag: 'ACCESS',
    title: 'No experience required',
    desc: 'No athletic background or prior martial arts knowledge needed.',
  },
  {
    number: '05',
    tag: 'PROGRESSION',
    title: 'Build real confidence',
    desc: 'Graduate to advanced groups only when you feel ready.',
  },
]


function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WhyBeginners() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>


        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14 items-end">
          <div className="md:col-span-8">
            <span
              className="inline-block mb-4"
              style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#AAAAAA' }}
            >
              Why Fight Factory
            </span>
            <h2
              className="text-[#0A0A0A]"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.25rem, 4vw + 0.75rem, 4rem)', letterSpacing: '0.01em', lineHeight: '1.0', textTransform: 'uppercase' }}
            >
              Why beginners choose<br />Fight Factory
            </h2>
          </div>
        </div>

        {/* Benefits — animated rows */}
        <div style={{ borderTop: '1px solid #E8E8E8' }}>
          {benefits.map((b) => (
            <div
              key={b.number}
              className="group relative flex items-start gap-6 md:gap-10 py-7 cursor-default"
              style={{ borderBottom: '1px solid #E8E8E8' }}
            >
              {/* Sliding left accent bar */}
              <div
                className="absolute left-0 top-3 bottom-3 w-0.5 bg-[#0A0A0A] rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"
              />

              {/* Number — fades to black on hover */}
              <span
                className="shrink-0 text-[#D0D0D0] group-hover:text-[#0A0A0A] transition-colors duration-300"
                style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '0.01em', lineHeight: '1', minWidth: '3rem' }}
              >
                {b.number}
              </span>

              {/* Tag */}
              <span
                className="hidden md:block shrink-0 text-[#C0C0C0] group-hover:text-[#888888] transition-colors duration-300"
                style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, minWidth: '7rem', paddingTop: '0.35rem' }}
              >
                {b.tag}
              </span>

              {/* Title + desc — slides right on hover */}
              <div className="flex-1 min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                <h3
                  className="text-[#0A0A0A] mb-1"
                  style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: '1.1' }}
                >
                  {b.title}
                </h3>
                <p className="text-[#888888] group-hover:text-[#555555] transition-colors duration-300" style={{ fontSize: '0.875rem', lineHeight: '1.65' }}>
                  {b.desc}
                </p>
              </div>

              {/* Arrow — slides in from left */}
              <div
                className="shrink-0 mt-1 text-[#AAAAAA] opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out"
              >
                <ArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="mt-10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8"
          style={{ background: 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)' }}
        >
          <div>
            <p
              className="text-white mb-1"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', letterSpacing: '0.01em', textTransform: 'uppercase', lineHeight: '1.1' }}
            >
              5-Class Onboarding System
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: '1.6' }}>
              The only program of its kind in Austin. Start with confidence, not confusion.
            </p>
          </div>
          <button
            onClick={openModal}
            className="shrink-0 bg-white text-[#0A0A0A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#F0F0F0] hover:scale-[1.02] transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ fontSize: '0.875rem' }}
          >
            Book a Free Trial →
          </button>
        </div>

      </div>
    </section>
  )
}

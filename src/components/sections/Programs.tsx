import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { useModal } from '../../hooks/useModal'
import { TrianglePattern } from '../ui/TrianglePattern'

const cards = [
  {
    id: 'kids',
    line1: 'KIDS',
    line2: 'JIU-JITSU',
    badge: 'KIDS PROGRAM',
    label: 'Kids class',
    src: '/images/2.webp',
  },
  {
    id: 'beginners',
    line1: 'BEGINNERS',
    line2: 'JIU-JITSU',
    badge: 'BEGINNER PROGRAM',
    label: 'Beginner class',
    src: '/images/1.webp',
  },
  {
    id: 'adults',
    line1: 'ADULTS',
    line2: 'JIU-JITSU',
    badge: 'ADVANCED PROGRAM',
    label: 'Adults class',
    src: '/images/3.webp',
  },
]

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 14L14 4M14 4H6M14 4V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProgramCard({ card }: { card: typeof cards[0] }) {
  const { openModal } = useModal()

  return (
    <div
      className="relative overflow-hidden group cursor-pointer"
      style={{ borderRadius: '20px', aspectRatio: '3/4' }}
      onClick={openModal}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {card.src ? (
          <img
            src={card.src}
            alt={card.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            aspectRatio=""
            label={card.label}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        {/* Title */}
        <h3
          className="text-white mb-4"
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            letterSpacing: '0.01em',
            lineHeight: '0.95',
            textTransform: 'uppercase',
          }}
        >
          {card.line1}<br />{card.line2}
        </h3>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <span
            className="text-white font-semibold uppercase tracking-[0.12em]"
            style={{ fontSize: '0.7rem' }}
          >
            Start Your Journey
          </span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #262626 0%, #0A0A0A 100%)' }}
          >
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Programs() {
  return (
    <section style={{ background: '#FFFFFF', padding: '80px 0', position: 'relative' }}>
      <TrianglePattern opacity={0.18} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Title */}
        <div className="mb-10">
          <h2
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.01em',
              lineHeight: '1.0',
              textTransform: 'uppercase',
            }}
          >
            <span className="text-[#0A0A0A]">Our </span>
            <span className="text-[#0A0A0A]">Classes</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card) => (
            <ProgramCard key={card.id} card={card} />
          ))}
        </div>

      </div>
    </section>
  )
}

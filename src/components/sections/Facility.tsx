import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { TrianglePattern } from '../ui/TrianglePattern'

const features = [
  '3,800 sqft facility',
  'Locker rooms and showers',
  'Family-friendly atmosphere',
  'Comfortable space for beginners',
  'Clean and organized environment',
]

function FeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#0A0A0A" fillOpacity="0.1" />
      <path d="M6 10L8.5 12.5L14 7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Facility() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left: text */}
          <div className="md:col-span-5">
            <Badge className="mb-4">THE ACADEMY</Badge>
            <h2
              className="text-[#0A0A0A] mb-5"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(2rem, 4vw + 0.75rem, 3.5rem)',
                letterSpacing: '0.01em',
                lineHeight: '1.0',
                textTransform: 'uppercase',
              }}
            >
              To start Jiu-Jitsu the right way, you need the right environment.
            </h2>
            <p
              className="text-[#555555] mb-7"
              style={{ fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', lineHeight: '1.65' }}
            >
              Fight Factory was designed to make beginners feel comfortable from day one, with:
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <FeatureIcon />
                  <span className="text-[#0A0A0A]" style={{ lineHeight: '1.65' }}>{feature}</span>
                </li>
              ))}
            </ul>
            <Button size="md" openModal>
              Click for a free trial class →
            </Button>
          </div>

          {/* Right: asymmetric photo gallery */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-2xl aspect-[16/7]">
              <img src="/images/6.webp" alt="Facility overview" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl aspect-square">
              <img src="/images/5.webp" alt="Training area" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl aspect-square">
              <img src="/images/7.webp" alt="Locker room" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { faqItems } from '../../data/faq'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { TrianglePattern } from '../ui/TrianglePattern'

function FAQItem({ item }: { item: typeof faqItems[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b transition-colors"
      style={{ borderColor: '#D8D8D8' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className="text-[#0A0A0A] font-semibold pr-4 group-hover:text-[#555555] transition-colors"
          style={{ fontSize: 'clamp(0.9375rem, 0.3vw + 0.875rem, 1rem)' }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 text-[#0A0A0A] transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <p
          className="text-[#555555] pb-5"
          style={{ lineHeight: '1.75', fontSize: '0.9375rem' }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative' }}>
      <TrianglePattern opacity={0.18} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left: header */}
          <div className="md:col-span-4">
            <Badge className="mb-4">COMMON QUESTIONS</Badge>
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
              Common Questions
            </h2>
            <Button size="md" openModal className="mt-4">
              Click to book your free trial class →
            </Button>
          </div>

          {/* Right: accordion */}
          <div className="md:col-span-8" style={{ borderTop: '1px solid #D8D8D8' }}>
            {faqItems.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

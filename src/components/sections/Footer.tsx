import { useModal } from '../../hooks/useModal'

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const contactItems = [
  {
    icon: <IconPin />,
    text: '9607 Research Blvd, Suite #675, Austin, TX 78759',
    href: 'https://maps.google.com/?q=Fight+Factory+Jiu-Jitsu+Austin+TX',
  },
  {
    icon: <IconPhone />,
    text: '(512) 428-6125',
    href: 'tel:5124286125',
  },
  {
    icon: <IconInstagram />,
    text: '@fightfactory_jiujitsu',
    href: 'https://instagram.com/fightfactory_jiujitsu',
  },
  {
    icon: <IconFacebook />,
    text: 'BrazilianFightFactory',
    href: 'https://www.facebook.com/BrazilianFightFactory',
  },
]

export function Footer() {
  const { openModal } = useModal()

  return (
    <footer>

      {/* Google Maps embed */}
      <div style={{ height: '420px', width: '100%', display: 'block' }}>
        <iframe
          src="https://maps.google.com/maps?q=Fight+Factory+Jiu-Jitsu,+9607+Research+Blvd,+Austin,+TX+78759&output=embed&z=15"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Fight Factory Jiu-Jitsu — Austin, TX"
        />
      </div>

      {/* Dark info section */}
      <div style={{
        background: '#0A0A0A',
        padding: '64px 0',
      }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

            {/* Left — brand */}
            <div className="md:col-span-5">
              <img
                src="/images/FONTE.webp"
                alt="Fight Factory Jiu-Jitsu"
                className="h-10 w-auto object-contain mb-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p
                className="mb-8"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '360px' }}
              >
                Welcome to Fight Factory, a family-friendly Jiu-Jitsu academy in Austin known for combining elite-level instruction with a beginner-friendly environment where kids and adults can build confidence and discipline from day one.
              </p>

              {/* CTA — outline style */}
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 font-semibold transition-all duration-200 cursor-pointer rounded-full hover:scale-[1.02]"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  color: '#FFFFFF',
                  background: 'transparent',
                  padding: '12px 24px',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF'
                  e.currentTarget.style.color = '#0A0A0A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
              >
                Book Your Trial Class
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Right — contact */}
            <div className="md:col-span-6 md:col-start-7">
              <p
                className="mb-5"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}
              >
                Contact
              </p>

              <div className="flex flex-col gap-3">
                {contactItems.map((item) => (
                  <a
                    key={item.text}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group"
                    style={{
                      background: '#161616',
                      border: '1px solid rgba(255,255,255,0.07)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  >
                    {item.icon}
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ background: '#050505', padding: '18px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            © 2026 Fight Factory Jiu-Jitsu · All rights reserved · By Novo Dash
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            Austin, TX
          </p>
        </div>
      </div>

    </footer>
  )
}

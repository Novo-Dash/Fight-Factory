import { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { getStoredUTMs } from '../../hooks/useUTMs'

type FormState = 'form' | 'loading' | 'success' | 'error'

interface FormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  program: string
  website: string // honeypot
}

const INITIAL_FORM: FormData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  program: 'beginner',
  website: '',
}

export function LeadModal() {
  const { isOpen, closeModal } = useModal()
  const [formState, setFormState] = useState<FormState>('form')
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [lastSubmit, setLastSubmit] = useState(0)

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot check
    if (formData.website) return

    // Rate limit
    const now = Date.now()
    if (now - lastSubmit < 5000) return
    setLastSubmit(now)

    setFormState('loading')

    try {
      const utms = getStoredUTMs()
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
        program: formData.program,
        source: 'landing_page',
        tags: ['trial_class', 'landing_page'],
        ...utms,
      }

      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Submit failed')

      setFormState('success')
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#D8D8D8] overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#999999] hover:text-[#0A0A0A] transition-colors z-10 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8">
          {formState === 'success' && (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(10,10,10,0.06)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 8" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[#0A0A0A] font-semibold text-xl mb-2" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em', fontSize: '1.75rem', textTransform: 'uppercase' }}>
                You're in!
              </h3>
              <p className="text-[#666666] text-sm" style={{ lineHeight: '1.65' }}>
                We'll be in touch shortly to confirm your free trial class. Check your email and SMS.
              </p>
            </div>
          )}

          {formState === 'error' && (
            <div className="text-center py-8">
              <p className="text-[#0A0A0A] font-semibold mb-2">Something went wrong.</p>
              <p className="text-[#666666] text-sm mb-4">Please try again or call us at (512) 428-6125.</p>
              <button onClick={() => setFormState('form')} className="text-[#0A0A0A] text-sm underline hover:text-[#555555] transition-colors cursor-pointer">
                Try again
              </button>
            </div>
          )}

          {(formState === 'form' || formState === 'loading') && (
            <>
              <div className="mb-6">
                <div
                  className="text-[#0A0A0A] mb-1"
                  style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.75rem', letterSpacing: '0.01em', textTransform: 'uppercase' }}
                >
                  Book Your Free Trial Class
                </div>
                <p className="text-[#666666] text-sm">No commitment · No experience required</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="first_name" className="block text-[#666666] text-xs mb-1.5 uppercase tracking-wider">First Name</label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-full text-[#0A0A0A] border border-[#D8D8D8] focus:border-[#0A0A0A] focus:outline-none transition-colors"
                      style={{ background: '#F5F5F5', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-[#666666] text-xs mb-1.5 uppercase tracking-wider">Last Name</label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-full text-[#0A0A0A] border border-[#D8D8D8] focus:border-[#0A0A0A] focus:outline-none transition-colors"
                      style={{ background: '#F5F5F5', fontSize: '16px' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[#666666] text-xs mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-full text-[#0A0A0A] border border-[#D8D8D8] focus:border-[#0A0A0A] focus:outline-none transition-colors"
                    style={{ background: '#F5F5F5', fontSize: '16px' }}
                    placeholder="(512) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#666666] text-xs mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-full text-[#0A0A0A] border border-[#D8D8D8] focus:border-[#0A0A0A] focus:outline-none transition-colors"
                    style={{ background: '#F5F5F5', fontSize: '16px' }}
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-[#666666] text-xs mb-1.5 uppercase tracking-wider">Program</label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-full text-[#0A0A0A] border border-[#D8D8D8] focus:border-[#0A0A0A] focus:outline-none transition-colors cursor-pointer"
                    style={{ background: '#F5F5F5', fontSize: '16px' }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="kids">Kids</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-[#CC0000] hover:bg-[#B30000] text-white font-semibold py-3.5 rounded-full transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
                  style={{ fontSize: '16px' }}
                >
                  {formState === 'loading' ? 'Sending...' : 'Book Free Trial Class →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

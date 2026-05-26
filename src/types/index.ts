export interface Program {
  id: string
  badge: string
  title: string
  description: string
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  timeAgo?: string
  avatarBg?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface LeadFormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  program: 'beginner' | 'kids' | 'advanced'
}

// Extend Window for tracking
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

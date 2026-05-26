import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const origin = req.headers.origin
  const allowedOrigin = process.env.VITE_ALLOWED_ORIGIN

  if (allowedOrigin && origin !== allowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('GHL_WEBHOOK_URL not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const body = req.body

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`GHL webhook returned ${response.status}`)
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Submit lead error:', error)
    return res.status(500).json({ error: 'Failed to submit lead' })
  }
}

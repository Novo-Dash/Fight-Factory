import { useEffect } from 'react'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
type UTMKey = typeof UTM_KEYS[number]

export function useUTMs() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    UTM_KEYS.forEach((key) => {
      const value = params.get(key)
      if (value) sessionStorage.setItem(key, value)
    })
  }, [])
}

export function getStoredUTMs(): Record<UTMKey, string> {
  return UTM_KEYS.reduce((acc, key) => {
    acc[key] = sessionStorage.getItem(key) ?? ''
    return acc
  }, {} as Record<UTMKey, string>)
}

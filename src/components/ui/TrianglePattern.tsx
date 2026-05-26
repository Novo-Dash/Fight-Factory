interface TrianglePatternProps {
  color?: string
  opacity?: number
}

export function TrianglePattern({ color = '#0A0A0A', opacity = 0.045 }: TrianglePatternProps) {
  const s = 56
  const h = Math.round(s * Math.sqrt(3) / 2) // ≈ 48

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
      style={{ zIndex: 0 }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-200px',
          animation: 'triangle-drift 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity }}
        >
          <defs>
            <pattern
              id="tri-grid"
              x="0"
              y="0"
              width={s}
              height={h * 2}
              patternUnits="userSpaceOnUse"
            >
              {/* Up-pointing triangle */}
              <polyline
                points={`0,${h} ${s / 2},0 ${s},${h}`}
                fill="none"
                stroke={color}
                strokeWidth="0.7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tri-grid)" />
        </svg>
      </div>
    </div>
  )
}

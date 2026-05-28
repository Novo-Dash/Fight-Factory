const items = [
  { src: '/images/galeria/1.webp',  width: '420px' },
  { src: '/images/galeria/2.webp',  width: '340px' },
  { src: '/images/galeria/3.webp',  width: '460px' },
  { src: '/images/galeria/4.webp',  width: '360px' },
  { src: '/images/galeria/5.webp',  width: '400px' },
  { src: '/images/galeria/6.webp',  width: '320px' },
  { src: '/images/galeria/7.webp',  width: '440px' },
  { src: '/images/galeria/8.webp',  width: '380px' },
  { src: '/images/galeria/9.webp',  width: '420px' },
  { src: '/images/galeria/11.webp', width: '460px' },
  { src: '/images/galeria/13.webp', width: '400px' },
  { src: '/images/galeria/14.webp', width: '440px' },
  { src: '/images/galeria/15.webp', width: '360px' },
  { src: '/images/galeria/16.webp', width: '420px' },
  { src: '/images/galeria/17.webp', width: '380px' },
  { src: '/images/galeria/18.webp', width: '460px' },
  { src: '/images/galeria/19.webp', width: '340px' },
  { src: '/images/galeria/20.webp', width: '420px' },
  { src: '/images/galeria/21.webp', width: '360px' },
  { src: '/images/galeria/22.webp', width: '440px' },
  { src: '/images/galeria/23.webp', width: '380px' },
  { src: '/images/galeria/24.webp', width: '400px' },
  { src: '/images/galeria/25.webp', width: '350px' },
]

const track = [...items, ...items]

export function Gallery() {
  return (
    <section style={{ background: '#FFFFFF', padding: '64px 0', overflow: 'hidden' }}>
      {/* Fade mask on edges */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 8%, transparent 92%, #FFFFFF 100%)',
          }}
        />
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              width: 'max-content',
              animation: 'gallery-scroll 120s linear infinite',
            }}
          >
            {track.map((item, i) => (
              <div
                key={i}
                style={{
                  width: item.width,
                  height: '360px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

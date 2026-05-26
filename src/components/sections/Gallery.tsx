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
  { src: '/images/galeria/10.webp', width: '350px' },
  { src: '/images/galeria/11.webp', width: '460px' },
  { src: '/images/galeria/12.webp', width: '330px' },
  { src: '/images/galeria/13.webp', width: '400px' },
]

const track = [...items, ...items]

export function Gallery() {
  return (
    <section style={{ background: '#FFFFFF', padding: '64px 0', overflow: 'hidden' }}>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
            animation: 'gallery-scroll 42s linear infinite',
          }}
        >
          {track.map((item, i) => (
            <div
              key={i}
              style={{
                width: item.width,
                height: '300px',
                borderRadius: '16px',
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
    </section>
  )
}

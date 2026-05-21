import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hovered, setHovered] = useState(false)

  return (
    <section id="contact" style={{
      background: 'linear-gradient(180deg, #1A1A1A 0%, #C55A3A 100%)',
      padding: '120px 40px 60px',
    }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}
      >
        <h2 style={{
          fontFamily: 'Cormorant, serif', fontWeight: 700,
          fontSize: 'clamp(40px, 5vw, 56px)',
          color: '#FFFFFF', marginBottom: 40, lineHeight: 1.1,
        }}>
          聯絡我
        </h2>

        <a
          href="mailto:shine9324578ya@gmail.com"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-block',
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 18, color: '#FFFFFF',
            textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 50,
            padding: '12px 36px',
            background: hovered ? 'rgba(255,255,255,0.12)' : 'transparent',
            transition: 'background 0.25s ease',
          }}
          aria-label="Send email to Annie Shih"
        >
          shine9324578ya@gmail.com
        </a>

        {/* Footer inside contact */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 13, color: 'rgba(255,255,255,0.45)',
          marginTop: 80,
        }}>
          © 2026 Annie Shih. All rights reserved.
        </p>
      </motion.div>
    </section>
  )
}

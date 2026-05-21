import { motion } from 'framer-motion'

// shape: 'circle' | 'square'
// variant: 'filled' | 'hatch'（斜線填充）
const shapes = [
  // 四周邊緣
  { size: 280, color: '#C55A3A', opacity: 0.09, shape: 'circle', variant: 'filled',
    pos: { top: '-100px', right: '-100px' },
    delay: 0, dur: 20, floatDelay: 0, dy: [0, -55, 0, 55, 0], dx: [0, -40, 0, 40, 0] },
  { size: 60,  color: '#E07855', opacity: 0.55, shape: 'circle', variant: 'hatch',
    pos: { top: '70px', right: '130px' },
    delay: 0.1, dur: 14, floatDelay: 2, dy: [0, -60, 0, 45, 0], dx: [0, 40, 0, -40, 0] },
  { size: 200, color: '#E07855', opacity: 0.11, shape: 'circle', variant: 'filled',
    pos: { top: '38%', right: '-50px' },
    delay: 0.15, dur: 22, floatDelay: 5, dy: [0, -50, 0, 60, 0], dx: [0, -30, 0, 30, 0] },
  { size: 160, color: '#F4A582', opacity: 0.55, shape: 'circle', variant: 'hatch',
    pos: { bottom: '80px', right: '50px' },
    delay: 0.2, dur: 18, floatDelay: 8, dy: [0, 50, 0, -55, 0], dx: [0, 40, 0, -40, 0] },
  { size: 55,  color: '#C55A3A', opacity: 0.18, shape: 'square', variant: 'filled',
    pos: { bottom: '160px', left: '30px' },
    delay: 0.25, dur: 16, floatDelay: 3, dy: [0, -55, 0, 45, 0], dx: [0, -35, 0, 35, 0] },
  { size: 90,  color: '#F4A582', opacity: 0.14, shape: 'circle', variant: 'filled',
    pos: { top: '30%', left: '-30px' },
    delay: 0.3, dur: 19, floatDelay: 6, dy: [0, 50, 0, -45, 0], dx: [0, 25, 0, -25, 0] },
  // 穿插文字後方（中央區域）
  { size: 130, color: '#C55A3A', opacity: 0.45, shape: 'circle', variant: 'hatch',
    pos: { top: '20%', left: '30%' },
    delay: 0.18, dur: 17, floatDelay: 7, dy: [0, 55, 0, -50, 0], dx: [0, -40, 0, 40, 0] },
  { size: 80,  color: '#E07855', opacity: 0.12, shape: 'circle', variant: 'filled',
    pos: { top: '65%', left: '20%' },
    delay: 0.22, dur: 21, floatDelay: 2, dy: [0, -50, 0, 40, 0], dx: [0, 35, 0, -35, 0] },
  { size: 100, color: '#F4A582', opacity: 0.10, shape: 'circle', variant: 'filled',
    pos: { top: '15%', left: '55%' },
    delay: 0.35, dur: 23, floatDelay: 9, dy: [0, 45, 0, -55, 0], dx: [0, -30, 0, 30, 0] },
  { size: 70,  color: '#C55A3A', opacity: 0.50, shape: 'circle', variant: 'hatch',
    pos: { top: '75%', left: '60%' },
    delay: 0.28, dur: 15, floatDelay: 1, dy: [0, -50, 0, 55, 0], dx: [0, 40, 0, -40, 0] },
  { size: 45,  color: '#E07855', opacity: 0.55, shape: 'square', variant: 'hatch',
    pos: { top: '55%', left: '75%' },
    delay: 0.32, dur: 13, floatDelay: 5, dy: [0, 45, 0, -55, 0], dx: [0, -30, 0, 30, 0] },
]

const marqueeItems = ['Product', 'Marketing', 'Strategy']

// Dotless "i" (ı) + manual orange dot overlay
function SpecialI() {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* U+0131 dotless i */}
      &#305;
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0.1em',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0.13em',
          height: '0.13em',
          borderRadius: '50%',
          backgroundColor: '#C55A3A',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </span>
  )
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#E8E1D5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>

      {/* Decorative shapes */}
      {shapes.map((s, i) => {
        const isCircle = s.shape === 'circle'
        const isHatch = s.variant === 'hatch'
        const bg = isHatch
          ? `repeating-linear-gradient(45deg, ${s.color} 0px, ${s.color} 1.5px, transparent 1.5px, transparent 9px)`
          : s.color
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, y: 0, x: 0 }}
            animate={{
              scale: 1,
              opacity: s.opacity,
              y: s.dy,
              x: s.dx,
            }}
            transition={{
              scale:   { duration: 0.8, delay: s.delay, ease: 'easeOut' },
              opacity: { duration: 0.8, delay: s.delay, ease: 'easeOut' },
              y: { duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.floatDelay + s.delay + 0.8 },
              x: { duration: s.dur * 1.15, repeat: Infinity, ease: 'easeInOut', delay: s.floatDelay + s.delay + 0.8 },
            }}
            style={{
              position: 'absolute',
              ...s.pos,
              width: s.size,
              height: s.size,
              borderRadius: isCircle ? '50%' : '12px',
              background: bg,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        )
      })}

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 40px 120px' }}>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'Cormorant, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(40px, 6vw, 68px)',
            lineHeight: 1.18,
            margin: 0,
            color: '#1A1A1A',
          }}
        >
          {/* Line 1 */}
          <span style={{ fontWeight: 400 }}>Hi, I&apos;m </span>
          <span style={{ fontWeight: 700 }}>
            Ann<SpecialI />e Sh<SpecialI />h
          </span>
          <span style={{ fontWeight: 700, color: '#C55A3A' }}>.</span>

          {/* Lines 2–3 */}
          <br />
          <span style={{ fontWeight: 400, color: '#1A1A1A' }}>
            Turning <span style={{ color: '#C55A3A' }}>insights</span> into impact,
            <br />
            from strategy to <span style={{ color: '#C55A3A' }}>execution</span><span style={{ color: '#A03D22' }}>.</span>
          </span>
        </motion.h1>

      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: '190px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 13,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#9B9B9B',
          }}
        >
          SCROLL ↓
        </motion.span>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '60px',
          left: 0,
          right: 0,
          overflow: 'hidden',
          borderTop: '1px solid rgba(26,26,26,0.1)',
          borderBottom: '1px solid rgba(26,26,26,0.1)',
          padding: '16px 0',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', width: 'max-content' }} className="animate-marquee-slow">
          {Array(6).fill(marqueeItems).flat().map((word, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'Cormorant, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 4vw, 52px)',
                color: '#1A1A1A',
                whiteSpace: 'nowrap',
                padding: '0 12px',
              }}>
                {word}
              </span>
              <span style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                color: '#C55A3A',
                padding: '0 4px',
                lineHeight: 1,
              }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}

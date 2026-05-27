import { motion } from 'framer-motion'

const awards = [
  '國際問題解決松 教育創新組第二名',
  '統一關係企業捷盟物流行銷提案競賽 第二名',
]

const sectionLabel = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 12,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#6B6B6B',
  marginBottom: 24,
}

function FadeUp({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section id="about" style={{ background: '#E8E1D5', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={sectionLabel}
        >
          [ ABOUT ]
        </motion.p>

        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left: 55% */}
          <div style={{ flex: '0 0 55%', minWidth: 280 }}>

            <FadeUp delay={0.05}>
              <h2 style={{
                fontFamily: 'Cormorant, serif', fontWeight: 700,
                fontSize: 'clamp(36px, 4vw, 48px)', color: '#1A1A1A',
                marginBottom: 28, lineHeight: 1.1,
              }}>
                我是 Annie
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 17, color: '#2D2D2D', lineHeight: 1.8, marginBottom: 20 }}>
                具多項專案負責人與跨部門協作經驗，曾主導產品與行銷專案從 0 到 1 規劃與執行，
                涵蓋市場研究、需求拆解、時程控管與成果追蹤。
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 17, color: '#2D2D2D', lineHeight: 1.8, marginBottom: 40 }}>
                擅長以使用者與商業目標為核心，結合數據分析與實務驗證，
                推動專案落地並創造具體成效。
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <InfoBlock label="教育背景">
                <p style={bodyText}>輔仁大學 企業管理學系</p>
                <p style={{ ...bodyText, color: '#6B6B6B' }}>永續產品與服務創新學程</p>
                <p style={{ ...bodyText, color: '#C55A3A', fontWeight: 500, marginTop: 4 }}>GPA: 3.8 / 4.0</p>
              </InfoBlock>
            </FadeUp>

            <FadeUp delay={0.2}>
              <InfoBlock label="證照">
                <p style={bodyText}>永續供應鏈管理顧問師</p>
              </InfoBlock>
            </FadeUp>

            <FadeUp delay={0.25}>
              <InfoBlock label="競賽獲獎">
                {awards.map((a) => (
                  <div key={a} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ color: '#C55A3A', marginTop: 2, flexShrink: 0 }}>•</span>
                    <p style={bodyText}>{a}</p>
                  </div>
                ))}
              </InfoBlock>
            </FadeUp>
          </div>

          {/* Right: photo */}
          <FadeUp delay={0.12} style={{ flex: '1 1 300px' }}>
            <div style={{
              width: '100%',
              maxWidth: 400,
              aspectRatio: '4/5.5',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              <img
                src="/about-photo.jpg"
                alt="Annie Shih"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

const bodyText = { fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#2D2D2D', lineHeight: 1.7, margin: 0 }

function InfoBlock({ label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase',
        color: '#C55A3A', marginBottom: 10,
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

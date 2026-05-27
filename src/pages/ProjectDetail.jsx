import { useParams, useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'

// ─── Shared styles ───────────────────────────────────────────────────────────
const bodyText = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  lineHeight: 1.85,
  color: '#2D2D2D',
  margin: 0,
}

function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 600, color: '#1A1A1A' }}>{part}</strong>
      : part
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoCard({ info }) {
  const fields = [
    { label: '單位', value: info.unit },
    { label: '執行期間', value: info.period },
    { label: '角色', value: info.role },
    { label: '團隊人數', value: info.teamSize },
  ]
  return (
    <div style={{ background: '#F5F3EF', borderRadius: 12, padding: '24px 32px', marginBottom: 56 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px 32px',
        marginBottom: 20,
      }}>
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 4 }}>
              {label}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 10 }}>
          個人專業能力
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {info.skills.map(s => (
            <span key={s} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#C55A3A',
              border: '1px solid #C55A3A', borderRadius: 20, padding: '5px 14px',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsGrid({ items }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
      gap: 16,
      marginBottom: 24,
    }}>
      {items.map(({ value, label }) => (
        <div key={label} style={{
          background: '#FFFFFF', borderRadius: 12, padding: '20px 12px',
          textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontFamily: 'Cormorant, serif', fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 40px)', color: '#C55A3A',
            lineHeight: 1.1, marginBottom: 8,
          }}>
            {value}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, 120)
    return () => clearTimeout(timer)
  }, [])
  return [ref, visible]
}

function FadeItem({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function ContentBlock({ block, index = 0 }) {
  const delay = index * 0.06

  switch (block.type) {
    case 'text':
      return (
        <FadeItem delay={delay}>
          <p style={{ ...bodyText, marginBottom: 16 }}>{renderBold(block.content)}</p>
        </FadeItem>
      )

    case 'list':
      return (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
          {block.items.map((item, i) => (
            <FadeItem key={i} delay={delay + i * 0.05}>
              <li style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#C55A3A', flexShrink: 0, marginTop: 3, fontSize: 14 }}>•</span>
                <span style={bodyText}>{renderBold(item)}</span>
              </li>
            </FadeItem>
          ))}
        </ul>
      )

    case 'numbered':
      return (
        <ol style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
          {block.items.map((item, i) => (
            <FadeItem key={i} delay={delay + i * 0.05}>
              <li style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#C55A3A', fontWeight: 600, flexShrink: 0, minWidth: 22, fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
                  {i + 1}.
                </span>
                <span style={bodyText}>{renderBold(item)}</span>
              </li>
            </FadeItem>
          ))}
        </ol>
      )

    case 'image':
      return (
        <FadeItem delay={delay}>
          <div style={{ margin: '24px 0' }}>
            <img
              src={block.src}
              alt={block.alt || ''}
              style={{ width: '100%', borderRadius: 12, display: 'block' }}
            />
          </div>
        </FadeItem>
      )

    case 'stats':
      return (
        <FadeItem delay={delay}>
          <StatsGrid items={block.items} />
        </FadeItem>
      )

    case 'subsection':
      return (
        <FadeItem delay={delay}>
          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
              color: '#C55A3A', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {block.title}
            </p>
            {block.blocks.map((b, i) => <ContentBlock key={i} block={b} index={i} />)}
          </div>
        </FadeItem>
      )

    default:
      return null
  }
}

function ProjectCover({ project }) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', cursor: project.link ? 'pointer' : 'default' }}
      onMouseEnter={() => project.link && setHovered(true)}
      onMouseLeave={() => project.link && setHovered(false)}
    >
      {(project.detailCover || project.cover) ? (
        <img
          src={project.detailCover || project.cover}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            animation: project.animated ? 'coverFloat 8s ease-in-out infinite alternate' : 'none',
            transformOrigin: 'center center',
          }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase' }}>
            Project Cover
          </span>
        </div>
      )}

      {/* Hover overlay */}
      {project.link && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.15)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />
      )}

      {/* Badge — 常駐中央，hover 時跟著變暗層一起更明顯 */}
      {project.link && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 50,
          padding: '10px 20px',
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
          color: '#1A1A1A',
          pointerEvents: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          transition: 'background 0.3s ease',
          whiteSpace: 'nowrap',
          ...(hovered && { background: 'rgba(255,255,255,1)' }),
        }}>
          ↗ 前往官網
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div style={{
        height: 'clamp(240px, 30vw, 380px)',
        background: project.gradient,
        margin: '24px 0 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
            {inner}
          </a>
        ) : inner}
      </div>

      {project.link && (
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: '#6B6B6B', textAlign: 'center',
          margin: '8px 0 24px',
        }}>
          ↗ 點擊圖片前往 Tripmate 官網
        </p>
      )}

      {!project.link && <div style={{ marginBottom: 24 }} />}
    </motion.div>
  )
}

function BackCTA({ handleBack }) {
  const [ref, visible] = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ textAlign: 'center', padding: '48px 40px 60px' }}
    >
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: 24 }}>
        [ END OF PROJECT ]
      </p>
      <button
        onClick={handleBack}
        style={{
          background: '#1A1A1A',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 50,
          padding: '16px 40px',
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          fontWeight: 500,
          cursor: 'pointer',
          letterSpacing: '0.5px',
          transition: 'background 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#C55A3A'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        ← 返回作品集首頁
      </button>
    </motion.div>
  )
}

function Section({ section }) {
  const [ref, visible] = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ marginBottom: 52 }}
    >
      <h2 style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20,
        color: '#1A1A1A', marginBottom: 20,
        paddingLeft: 16,
        borderLeft: '3px solid #C55A3A',
        lineHeight: 1.3,
      }}>
        {section.title}
      </h2>
      {section.blocks.map((block, i) => (
        <ContentBlock key={i} block={block} index={i} />
      ))}
    </motion.div>
  )
}

function SkillTags({ tags }) {
  return (
    <div style={{ paddingTop: 32, borderTop: '1px solid rgba(26,26,26,0.1)', marginTop: 24 }}>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12,
        color: '#9B9B9B', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16,
      }}>
        使用技能
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#C55A3A',
            border: '1px solid #C55A3A', borderRadius: 20, padding: '6px 16px',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects[id]

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleBack = () => {
    navigate('/', { state: { scrollTo: 'projects' } })
  }

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#E8E1D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B' }}>找不到此專案</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#E8E1D5', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: 70 }}>
        {/* Back link */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 40px 0' }}>
          <button
            onClick={handleBack}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B6B6B',
              display: 'flex', alignItems: 'center', gap: 6, padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C55A3A'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B6B6B'}
          >
            ← 返回作品集
          </button>
        </div>

        {/* Cover */}
        <ProjectCover project={project} />

        {/* Content */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 0' }}>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: 'Cormorant, serif', fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 52px)', color: '#1A1A1A',
              marginBottom: 28, lineHeight: 1.1,
            }}
          >
            {project.title}
          </motion.h1>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoCard info={project.info} />
          </motion.div>

          {/* Sections */}
          {project.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}

          {/* PDF Embed */}
          {project.pdfUrl && (
            <div style={{ marginTop: 48, marginBottom: 16 }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20,
                color: '#1A1A1A', marginBottom: 8,
                paddingLeft: 16, borderLeft: '3px solid #C55A3A', lineHeight: 1.3,
              }}>
                專案簡報
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9B9B9B',
                marginBottom: 20, paddingLeft: 16,
              }}>
                可在下方視窗內捲動瀏覽完整簡報內容 ↓
              </p>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <iframe
                  src={project.pdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', display: 'block' }}
                  title="專案簡報"
                />
              </div>
            </div>
          )}

        </div>

        {/* Back to portfolio CTA */}
        <BackCTA handleBack={handleBack} />

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(26,26,26,0.08)', padding: '24px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(26,26,26,0.35)' }}>
            © 2026 Annie Shih. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes coverFloat {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.06) translate(-1%, -1%); }
        }
      `}</style>
    </div>
  )
}

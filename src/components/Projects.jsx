import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const projects = [
  {
    title: 'KRUSH Dance TUV專案',
    desc: '打造以「活化腦部」為核心的創新舞蹈服務，並設計 MVP 測試驗證市場方向',
    tags: ['市場研究', 'MVP設計', '使用者旅程'],
    period: '2025.09 — 2026.01',
    gradient: 'linear-gradient(135deg, #C55A3A, #E07855)',
    cover: '/project-krush.png',
    route: '/project/krush',
  },
  {
    title: '香氛產品開發與市集銷售',
    desc: '三個月內從 0 到 1 開發 4 款香氛產品並完成校園市集銷售，ROA 達 2 倍，滿意度 92%',
    tags: ['市場分析', '產品設計', '市集銷售'],
    period: '2025.02 — 2025.05',
    gradient: 'linear-gradient(135deg, #E07855, #F4A582)',
    cover: '/project-fragrance.png',
    route: '/project/fragrance',
  },
  {
    title: 'Tripmate 地陪媒合網站',
    desc: '負責地陪媒合平台的網站優化與 LINE 社群經營，並透過 Fakedoor 實驗與 GA 數據驅動持續優化',
    tags: ['網站架設', '社群經營', '行銷工具應用'],
    period: '2025.09 — 2025.12',
    gradient: 'linear-gradient(135deg, #F4A582, #C55A3A)',
    cover: '/project-tripmate.png',
    route: '/project/tripmate',
  },
  {
    title: 'Social Media Portfolio',
    desc: '跨品牌社群內容創作，涵蓋 Reels、貼文與主視覺設計，最高單支 Reel 達到 84.5K 瀏覽',
    tags: ['短影音製作', '視覺設計', '品牌行銷'],
    period: '2025.01 — Present',
    gradient: 'linear-gradient(135deg, #C55A3A, #F4A582)',
    cover: null,
    route: '/project/social-media',
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.12)'
          : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: project.route ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => project.route && navigate(project.route)}
    >
      {/* Cover image area */}
      <div style={{
        height: 220,
        background: project.gradient,
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: 13, letterSpacing: '2px' }}>
              PROJECT COVER
            </span>
          </div>
        )}
      </div>

      {/* Text area */}
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 22, color: '#1A1A1A', margin: 0, lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 15, color: '#6B6B6B', lineHeight: 1.6,
          marginTop: 8, marginBottom: 16,
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: 12, color: '#6B6B6B',
              border: '1px solid #E0D6C8',
              borderRadius: 20, padding: '4px 12px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#999', marginBottom: 16 }}>
          {project.period}
        </p>

        {/* CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 14, color: '#C55A3A',
            display: 'flex', alignItems: 'center', gap: 4,
            transition: 'gap 0.3s ease',
            gap: hovered ? 8 : 4,
          }}>
            查看詳情
            <span style={{
              display: 'inline-block',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" style={{ background: '#F5F3EF', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase',
            color: '#6B6B6B', marginBottom: 24,
          }}
        >
          [ PROJECTS ]
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'Cormorant, serif', fontWeight: 600,
            fontSize: 'clamp(36px, 4vw, 48px)', color: '#1A1A1A',
            marginBottom: 48,
          }}
        >
          Projects
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
          gap: 32,
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #projects .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

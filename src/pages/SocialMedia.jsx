import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

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

function FadeUp({ children, delay = 0, style }) {
  const [ref, visible] = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function ReelPlaceholder({ label, data, src }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: '100%',
        aspectRatio: '9/16',
        background: 'linear-gradient(135deg, #C55A3A, #E07855)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {src
          ? <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>▶</span>
        }
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9B9B9B' }}>{data}</p>
      </div>
    </div>
  )
}

function PostPlaceholder({ label, data }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: '100%',
        aspectRatio: '1/1',
        background: 'linear-gradient(135deg, #E07855, #F4A582)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>🖼</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9B9B9B' }}>{data}</p>
      </div>
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 12, padding: '20px 24px',
      textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      flex: '1 1 0',
    }}>
      <p style={{
        fontFamily: 'Cormorant, serif', fontWeight: 700,
        fontSize: 'clamp(24px, 3vw, 36px)', color: '#C55A3A',
        lineHeight: 1.1, marginBottom: 8,
      }}>
        {value}
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B6B6B' }}>{label}</p>
    </div>
  )
}

function SectionTag({ label }) {
  return (
    <span style={{
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      letterSpacing: '1.5px', textTransform: 'uppercase',
      color: '#C55A3A', border: '1px solid #C55A3A',
      borderRadius: 20, padding: '4px 12px',
      display: 'inline-block', marginBottom: 16,
    }}>
      {label}
    </span>
  )
}

export default function SocialMedia() {
  const navigate = useNavigate()
  const handleBack = () => navigate('/', { state: { scrollTo: 'projects' } })

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

        {/* Header */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px 0' }}>
          <FadeUp delay={0}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: '#6B6B6B', marginBottom: 16,
            }}>
              [ SOCIAL MEDIA ]
            </p>
            <h1 style={{
              fontFamily: 'Cormorant, serif', fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 52px)', color: '#1A1A1A',
              lineHeight: 1.1, marginBottom: 12,
            }}>
              Social Media Content Portfolio
            </h1>
            <p style={{
              fontFamily: 'Cormorant, serif', fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#C55A3A', marginBottom: 12,
            }}>
              社群內容創作作品集
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: '#9B9B9B', marginBottom: 16,
            }}>
              代表作品
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B6B6B',
              lineHeight: 1.7, marginBottom: 56,
            }}>
              跨品牌社群內容創作，涵蓋短影音製作、貼文視覺設計與活動主視覺統籌
            </p>
          </FadeUp>

          <div style={{ borderTop: '1px solid rgba(26,26,26,0.1)', marginBottom: 64 }} />

          {/* Block 1 */}
          <FadeUp delay={0.05}>
            <SectionTag label="Instagram Reels" />
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22,
              color: '#1A1A1A', marginBottom: 12,
            }}>
              永豐銀行校園大使
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#2D2D2D',
              lineHeight: 1.8, marginBottom: 36,
            }}>
              擔任永豐銀行校園大使，負責規劃影片腳本、協作拍攝與後期剪輯，
              製作品牌 Reels 與貼文，協助金融品牌在學生族群中建立親和力。
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
              <ReelPlaceholder label="永豐人才 請上車🚗" data="84.5K 觀看" src="/yf-reel-1.jpg" />
              <ReelPlaceholder label="聖誕節快樂🎄" data="10K 觀看" src="/yf-reel-2.jpg" />
              <ReelPlaceholder label="加入永豐你可以獲得" data="5K 觀看" src="/yf-reel-3.jpg" />
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 64 }}>
              <StatCard value="84.5K" label="最高單則觸及" />
              <StatCard value="2.6K" label="帳號粉絲數" />
            </div>
          </FadeUp>

          <div style={{ borderTop: '1px solid rgba(26,26,26,0.1)', marginBottom: 64 }} />

          {/* Block 2 */}
          <FadeUp delay={0}>
            <SectionTag label="Instagram Posts" />
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22,
              color: '#1A1A1A', marginBottom: 12,
            }}>
              創新創業社社幹部
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#2D2D2D',
              lineHeight: 1.8, marginBottom: 36,
            }}>
              擔任創新創業社幹部，有協助社群經營與貼文內容製作。
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: 'flex', gap: 20, maxWidth: 480, marginBottom: 64 }}>
              <PostPlaceholder label="創業精神三大特質系列" data="教育型內容" />
              <PostPlaceholder label="NEXT UP 活動宣傳系列" data="活動推廣" />
            </div>
          </FadeUp>
        </div>

        {/* Back CTA */}
        <BackCTA handleBack={handleBack} />

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(26,26,26,0.08)', padding: '24px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(26,26,26,0.35)' }}>
            © 2026 Annie Shih. All rights reserved.
          </p>
        </div>
      </div>
    </div>
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
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        letterSpacing: '3px', textTransform: 'uppercase',
        color: '#9B9B9B', marginBottom: 24,
      }}>
        [ END OF PROJECT ]
      </p>
      <button
        onClick={handleBack}
        style={{
          background: '#1A1A1A', color: '#FFFFFF', border: 'none',
          borderRadius: 50, padding: '16px 40px',
          fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
          cursor: 'pointer', letterSpacing: '0.5px',
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

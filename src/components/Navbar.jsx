import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['contact', 'projects', 'about']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`)
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleNav = (href) => {
    setMenuOpen(false)
    const sectionId = href.replace('#', '')
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? 'rgba(232,225,213,0.95)'
          : 'rgba(232,225,213,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(26,26,26,0.08)' : 'none',
        transition: 'background 0.3s ease, border 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', paddingRight: 120, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#1A1A1A', letterSpacing: '0.01em' }}
        >
          Annie Shih
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none', alignItems: 'center' }} className="hidden-mobile">
          {links.map(({ label, href }) => (
            <li key={href}>
              <NavLink label={label} href={href} active={active === href} onClick={() => handleNav(href)} />
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2, background: '#1A1A1A',
              transformOrigin: 'center',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scale(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(232,225,213,0.98)',
            borderTop: '1px solid rgba(26,26,26,0.1)',
            padding: '32px 40px',
          }}
        >
          {links.map(({ label, href }) => (
            <div key={href} style={{ marginBottom: 24 }}>
              <button
                onClick={() => handleNav(href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  fontSize: '1rem', color: '#1A1A1A',
                  textTransform: 'uppercase', letterSpacing: '2px',
                }}
              >
                {label}
              </button>
            </div>
          ))}
        </motion.div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </motion.nav>
  )
}

function NavLink({ label, href, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const highlight = active || hovered
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        position: 'relative',
        fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.95rem',
        color: highlight ? '#C55A3A' : '#1A1A1A',
        transition: 'color 0.2s ease',
        letterSpacing: '0.02em',
      }}
    >
      {label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 2, background: '#C55A3A',
        width: highlight ? '100%' : '0%',
        transition: 'width 0.3s ease',
      }} />
    </button>
  )
}

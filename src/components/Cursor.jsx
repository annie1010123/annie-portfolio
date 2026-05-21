import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) setHovered(true)
      else setHovered(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  const size = clicked ? 18 : hovered ? 44 : 28

  return (
    // 外層：跟隨滑鼠位置（spring 動畫）
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.4 }}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
    >
      {/* 內層：置中 + 大小變化 */}
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1.5px solid #C55A3A',
          background: clicked ? 'rgba(197,90,58,0.12)' : 'transparent',
          mixBlendMode: 'multiply',
        }}
      />
    </motion.div>
  )
}

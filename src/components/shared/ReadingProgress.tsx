"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-100"
      style={{
        scaleX,
        background: "linear-gradient(to right, oklch(0.76 0.13 72), oklch(0.85 0.09 72 / 0.6))",
      }}
    />
  )
}

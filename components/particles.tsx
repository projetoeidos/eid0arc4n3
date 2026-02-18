"use client"

import { useEffect, useRef } from "react"

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const createParticle = () => {
      const maxLife = 300 + Math.random() * 400
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.2 + Math.random() * 0.5),
        size: Math.random() * 1.5 + 0.5,
        opacity: 0,
        life: 0,
        maxLife,
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particles.length < 30 && Math.random() < 0.05) {
        particles.push(createParticle())
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        const lifeRatio = p.life / p.maxLife
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio * 10 * 0.3
        } else if (lifeRatio > 0.9) {
          p.opacity = (1 - lifeRatio) * 10 * 0.3
        } else {
          p.opacity = 0.3
        }

        if (p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 0, 0, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  )
}

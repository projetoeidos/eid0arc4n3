"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.05

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority

        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#050507]/75" />

      {/* Red Gradient Sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/10 via-transparent to-[#8B0000]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Arcane Symbol */}
        <div
          className={`mb-8 transition-all duration-[1200ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-16 h-16 mx-auto border border-[#8B0000]/40 rotate-45 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#8B0000]/20 flex items-center justify-center -rotate-45">
              <span className="font-[var(--font-cinzel)] text-[#8B0000] text-lg font-bold">33</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`font-[var(--font-cinzel)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.15em] text-[#F5F5F5] transition-all duration-[1500ms] delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ARQUIVO ARCANO
        </h1>

        {/* Decorative line */}
        <div
          className={`my-6 flex items-center gap-4 transition-all duration-[1500ms] delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#8B0000]/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#8B0000]/60" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#8B0000]/50" />
        </div>

        {/* Subtitle */}
        <p
          className={`font-[var(--font-cinzel)] text-sm sm:text-base tracking-[0.4em] text-[#F5F5F5]/50 uppercase transition-all duration-[1500ms] delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Biblioteca Oculta
        </p>

        {/* Tagline */}
        <p
          className={`mt-8 text-sm sm:text-base text-[#F5F5F5]/40 italic tracking-wide leading-relaxed transition-all duration-[1500ms] delay-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {"Escolha sua intenção."}
        </p>

        {/* CTA */}
        <Link
          href="/arquivos"
          className={`mt-10 px-10 py-4 bg-[#8B0000] text-[#F5F5F5] font-[var(--font-cinzel)] text-sm tracking-[0.3em] uppercase border border-[#8B0000] hover:bg-[#B11212] hover:border-[#B11212] transition-all duration-700 btn-breathe ${
            loaded ? "opacity-100 translate-y-0 delay-[1100ms]" : "opacity-0 translate-y-4"
          }`}
        >
          Iniciar Iniciação
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1500ms] delay-[1500ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}>
        <span className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/20 uppercase">Descer</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8B0000]/40 to-transparent" />
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useProgression } from "@/lib/progression-context"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { state } = useProgression()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? "bg-[#050507]/90 backdrop-blur-md border-b border-[#1A1A1F]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-[#8B0000]/50 flex items-center justify-center group-hover:border-[#B11212] transition-colors duration-500">
            <span className="font-[var(--font-cinzel)] text-[#8B0000] text-xs font-bold group-hover:text-[#B11212] transition-colors duration-500">
              33
            </span>
          </div>
          <span className="font-[var(--font-cinzel)] text-sm tracking-[0.3em] text-[#F5F5F5]/80 hidden sm:block">
            ARQUIVO ARCANO
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase"
          >
            Portal
          </Link>
          <Link
            href="/arquivos"
            className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase"
          >
            Arquivos
          </Link>
          <Link
            href="/atualizacoes"
            className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase"
          >
            Central
          </Link>
          <Link
            href="/ritual"
            className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase"
          >
            Ritual
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-[#1A1A1F] bg-[#0B0B10]/50">
            <div className="w-2 h-2 rounded-full bg-[#8B0000] shadow-[0_0_6px_rgba(139,0,0,0.5)]" />
            <span className="text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 font-[var(--font-cinzel)]">
              {state.level}
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-[#F5F5F5]/60 transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`w-5 h-px bg-[#F5F5F5]/60 transition-all duration-500 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-[#F5F5F5]/60 transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ${
          menuOpen ? "max-h-64 border-b border-[#1A1A1F]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6 bg-[#050507]/95 backdrop-blur-md">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase">
            Portal
          </Link>
          <Link href="/arquivos" onClick={() => setMenuOpen(false)} className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase">
            Arquivos
          </Link>
          <Link href="/atualizacoes" onClick={() => setMenuOpen(false)} className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase">
            Central
          </Link>
          <Link href="/ritual" onClick={() => setMenuOpen(false)} className="text-xs tracking-[0.2em] text-[#F5F5F5]/50 hover:text-[#B11212] transition-colors duration-500 uppercase">
            Ritual
          </Link>
          <div className="flex items-center gap-2 pt-2 border-t border-[#1A1A1F]">
            <div className="w-2 h-2 rounded-full bg-[#8B0000] shadow-[0_0_6px_rgba(139,0,0,0.5)]" />
            <span className="text-[10px] tracking-[0.2em] text-[#F5F5F5]/60 font-[var(--font-cinzel)]">
              {state.level}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { UPDATES } from "@/lib/mock-data"
import { ChevronRight, FileText, Clock, AlertTriangle, Bell } from "lucide-react"

function Countdown({ target }: { target: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calc = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) { setTimeLeft("Liberado"); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`)
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [target])

  return <span className="pulse-red font-[var(--font-cinzel)] text-[#B11212] text-sm tracking-wider">{timeLeft}</span>
}

const TYPE_ICONS = {
  liberado: <FileText className="w-4 h-4" />,
  preparacao: <Clock className="w-4 h-4" />,
  proxima: <AlertTriangle className="w-4 h-4" />,
  aviso: <Bell className="w-4 h-4" />,
}

const TYPE_LABELS = {
  liberado: "Documento Liberado",
  preparacao: "Arquivo em Preparação",
  proxima: "Próxima Liberação",
  aviso: "Aviso da Ordem",
}

export default function AtualizacoesPage() {
  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      <section className="pt-28 pb-8 px-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#F5F5F5]/20 uppercase mb-8">
          <Link href="/" className="hover:text-[#B11212] transition-colors duration-500">Portal</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F5F5]/40">Central de Atualizações</span>
        </div>

        <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl tracking-[0.15em] text-[#F5F5F5] mb-4">
          Central de Atualizações
        </h1>
        <p className="text-sm text-[#F5F5F5]/30 leading-relaxed mb-2">
          Registros do diário da Ordem. Fique atento às movimentações.
        </p>
        <div className="w-16 h-px bg-[#8B0000]/40" />
      </section>

      {/* Feed */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B0000]/20 via-[#1A1A1F] to-transparent" />

          <div className="flex flex-col gap-8">
            {UPDATES.map((update) => (
              <div key={update.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-6 w-3 h-3 rotate-45 border border-[#8B0000]/40 bg-[#050507]" />

                <div className="border border-[#1A1A1F] bg-[#0B0B10]/40 p-6 sm:p-8 transition-all duration-500 hover:border-[#8B0000]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#8B0000]">{TYPE_ICONS[update.type]}</div>
                    <span className="text-[10px] tracking-[0.3em] text-[#8B0000] uppercase font-[var(--font-cinzel)]">
                      {TYPE_LABELS[update.type]}
                    </span>
                  </div>

                  <h3 className="font-[var(--font-cinzel)] text-base sm:text-lg tracking-wide text-[#F5F5F5] mb-2">
                    {update.title}
                  </h3>
                  <p className="text-sm text-[#F5F5F5]/30 leading-relaxed mb-4">
                    {update.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#F5F5F5]/15">
                      {new Date(update.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                    {update.countdown && <Countdown target={update.countdown} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#1A1A1F] py-8 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/20 uppercase font-[var(--font-cinzel)]">
          Arquivo Arcano — Biblioteca Oculta
        </p>
      </footer>
    </main>
  )
}

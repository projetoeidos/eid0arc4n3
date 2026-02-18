"use client"

import Link from "next/link"
import Image from "next/image"
import { INTENTIONS, DOCUMENTS } from "@/lib/mock-data"
import { useProgression } from "@/lib/progression-context"
import { Flame, BookOpen, Eye, Shield, Lock, Clock } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const ICONS: Record<string, React.ReactNode> = {
  flame: <Flame className="w-6 h-6" />,
  book: <BookOpen className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
}

function Countdown({ target }: { target: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calc = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) { setTimeLeft("Liberado"); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setTimeLeft(`${d}d ${h}h ${m}m`)
    }
    calc()
    const interval = setInterval(calc, 60000)
    return () => clearInterval(interval)
  }, [target])

  return <span className="pulse-red font-[var(--font-cinzel)] text-[#B11212] text-sm">{timeLeft}</span>
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-16">
      <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#8B0000]/30" />
      <div className="w-2 h-2 rotate-45 border border-[#8B0000]/30" />
      <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#8B0000]/30" />
    </div>
  )
}

export function IntentionsSection() {
  return (
    <section className="relative px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-[var(--font-cinzel)] text-2xl sm:text-3xl tracking-[0.2em] text-[#F5F5F5]">
          Escolha Sua Intenção
        </h2>
        <div className="mt-4 w-16 h-px bg-[#8B0000]/40 mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {INTENTIONS.map((intent) => (
          <Link
            key={intent.id}
            href={`/arquivos?cat=${intent.id}`}
            className="group relative overflow-hidden border border-[#1A1A1F] bg-[#0B0B10]/60 p-8 sm:p-10 transition-all duration-700 hover:border-[#8B0000]/30 hover:bg-[#0B0B10]/80"
          >
            {/* Watermark */}
            <span className="absolute top-4 right-4 font-[var(--font-cinzel)] text-[80px] leading-none text-[#F5F5F5]/[0.02] font-bold select-none pointer-events-none">
              33
            </span>

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#8B0000]/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="text-[#8B0000] group-hover:text-[#B11212] transition-colors duration-500">
                {ICONS[intent.icon]}
              </div>
              <h3 className="font-[var(--font-cinzel)] text-lg tracking-[0.1em] text-[#F5F5F5] group-hover:text-[#F5F5F5] transition-colors">
                {intent.title}
              </h3>
              <p className="text-sm text-[#F5F5F5]/40 leading-relaxed">
                {intent.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function RecentlyReleasedSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { canAccess } = useProgression()
  const releasedDocs = DOCUMENTS.filter((d) => d.released)

  return (
    <section className="relative py-20">
      <div className="px-6 max-w-6xl mx-auto mb-10">
        <h2 className="font-[var(--font-cinzel)] text-2xl sm:text-3xl tracking-[0.2em] text-[#F5F5F5]">
          Recém Liberados
        </h2>
        <div className="mt-4 w-16 h-px bg-[#8B0000]/40" />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {releasedDocs.map((doc) => (
          <Link
            key={doc.id}
            href={`/documento/${doc.id}`}
            className="group flex-shrink-0 w-[300px] sm:w-[340px] snap-start relative overflow-hidden border border-[#1A1A1F] bg-[#0B0B10]/60 transition-all duration-700 hover:border-[#8B0000]/30"
          >
            <div className="relative h-48 overflow-hidden light-sweep">
              <Image
                src={doc.cover}
                alt={doc.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/50 to-transparent" />
              {!canAccess(doc.requiredLevel) && (
                <div className="absolute top-3 right-3 p-2 bg-[#050507]/80 border border-[#1A1A1F]">
                  <Lock className="w-3.5 h-3.5 text-[#8B0000]" />
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-[10px] tracking-[0.3em] text-[#8B0000] uppercase mb-2 font-[var(--font-cinzel)]">
                {doc.subtitle}
              </p>
              <h3 className="font-[var(--font-cinzel)] text-base tracking-wide text-[#F5F5F5] mb-2">
                {doc.title}
              </h3>
              <div className="flex items-center gap-2 text-[#F5F5F5]/30 text-xs">
                <Clock className="w-3 h-3" />
                {doc.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ClassifiedSection() {
  const preparingDocs = DOCUMENTS.filter((d) => !d.released)

  return (
    <section className="relative px-6 py-20 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="font-[var(--font-cinzel)] text-2xl sm:text-3xl tracking-[0.2em] text-[#F5F5F5]">
          Arquivos Classificados
        </h2>
        <div className="mt-4 w-16 h-px bg-[#8B0000]/40" />
      </div>

      <div className="flex flex-col gap-6">
        {preparingDocs.map((doc) => (
          <div
            key={doc.id}
            className="relative overflow-hidden border border-[#1A1A1F] bg-[#0B0B10]/40 p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-4 h-4 text-[#8B0000]/60" />
                  <span className="text-[10px] tracking-[0.3em] text-[#8B0000]/60 uppercase font-[var(--font-cinzel)]">
                    Arquivo em Preparação
                  </span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-lg tracking-wide text-[#F5F5F5]/60">
                  {doc.title}
                </h3>
                <p className="mt-2 text-sm text-[#F5F5F5]/30 leading-relaxed">{doc.description}</p>
              </div>
              {doc.preparingUntil && (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] tracking-[0.2em] text-[#F5F5F5]/20 uppercase">Previsão</span>
                  <Countdown target={doc.preparingUntil} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function RetentionMessage() {
  return (
    <section className="relative px-6 py-20 max-w-3xl mx-auto text-center">
      <div className="border border-[#1A1A1F] bg-[#0B0B10]/30 p-10 sm:p-14">
        <div className="w-8 h-px bg-[#8B0000]/40 mx-auto mb-6" />
        <p className="font-[var(--font-cinzel)] text-sm sm:text-base tracking-[0.15em] text-[#F5F5F5]/40 italic leading-relaxed">
          {"\"A Ordem observou seu progresso. Continue no caminho e novas portas se abrirão.\""}
        </p>
        <div className="w-8 h-px bg-[#8B0000]/40 mx-auto mt-6" />
      </div>
    </section>
  )
}

export { SectionDivider }

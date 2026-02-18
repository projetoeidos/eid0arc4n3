"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { DOCUMENTS } from "@/lib/mock-data"
import { useProgression } from "@/lib/progression-context"
import { Clock, Lock, ChevronRight, BookOpen } from "lucide-react"

export default function DocumentoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const doc = DOCUMENTS.find((d) => d.id === id)
  const { canAccess } = useProgression()

  if (!doc) {
    return (
      <main className="min-h-screen bg-[#050507] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-[var(--font-cinzel)] text-2xl text-[#F5F5F5]/50">Documento Não Encontrado</h1>
          <Link href="/arquivos" className="mt-6 inline-block text-sm text-[#8B0000] hover:text-[#B11212] transition-colors">
            Voltar aos Arquivos
          </Link>
        </div>
      </main>
    )
  }

  const hasAccess = canAccess(doc.requiredLevel)

  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#F5F5F5]/20 uppercase mb-10">
          <Link href="/" className="hover:text-[#B11212] transition-colors duration-500">Portal</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/arquivos" className="hover:text-[#B11212] transition-colors duration-500">Arquivos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F5F5]/40">{doc.title}</span>
        </div>
      </div>

      {/* Document Layout */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Image */}
          <div className="relative w-full lg:w-1/2 aspect-[3/4] max-h-[600px] overflow-hidden border border-[#1A1A1F]">
            <Image
              src={doc.cover}
              alt={doc.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-[#050507]/30" />
            <div className="absolute inset-0 border border-[#8B0000]/10" />
          </div>

          {/* Right - Info */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.4em] text-[#8B0000] uppercase font-[var(--font-cinzel)] mb-4">
              {doc.subtitle}
            </p>

            <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl tracking-[0.1em] text-[#F5F5F5] mb-6">
              {doc.title}
            </h1>

            <div className="w-12 h-px bg-[#8B0000]/30 mb-6" />

            <p className="text-sm sm:text-base text-[#F5F5F5]/40 leading-relaxed mb-8">
              {doc.description}
            </p>

            <div className="flex items-center gap-6 mb-10 text-xs text-[#F5F5F5]/30">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                {doc.readTime}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                {doc.content.length} {doc.content.length === 1 ? "parte" : "partes"}
              </div>
              <div className="px-3 py-1 border border-[#1A1A1F] text-[10px] tracking-[0.2em] uppercase">
                {doc.requiredLevel}
              </div>
            </div>

            {hasAccess && doc.released ? (
              <Link
                href={`/leitor/${doc.id}`}
                className="inline-flex items-center justify-center px-10 py-4 bg-[#8B0000] text-[#F5F5F5] font-[var(--font-cinzel)] text-sm tracking-[0.3em] uppercase border border-[#8B0000] hover:bg-[#B11212] hover:border-[#B11212] transition-all duration-700 btn-breathe self-start"
              >
                Ler Documento
              </Link>
            ) : (
              /* Locked state */
              <div className="border border-[#1A1A1F] bg-[#0B0B10]/60 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-[#8B0000]" />
                  <span className="font-[var(--font-cinzel)] text-sm tracking-[0.2em] text-[#F5F5F5]/60">
                    Acesso Restrito
                  </span>
                </div>
                <p className="text-sm text-[#F5F5F5]/30 leading-relaxed mb-6">
                  {"Este documento exige Nível "}
                  <span className="text-[#B11212] font-[var(--font-cinzel)]">{doc.requiredLevel}</span>
                  {"."}
                </p>
                <Link
                  href="/ritual"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#8B0000]/20 border border-[#8B0000]/40 text-[#F5F5F5] font-[var(--font-cinzel)] text-xs tracking-[0.2em] uppercase hover:bg-[#8B0000]/30 transition-all duration-500"
                >
                  Desbloquear Acesso
                </Link>
              </div>
            )}
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

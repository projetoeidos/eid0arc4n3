"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { DOCUMENTS, INTENTIONS, getDocHref } from "@/lib/mock-data"
import { useProgression } from "@/lib/progression-context"
import { Lock, Clock, ChevronRight } from "lucide-react"

function ArchivesContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get("cat") || "todos"
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const { canAccess } = useProgression()

  const categories = [
    { id: "todos", label: "Todos" },
    ...INTENTIONS.map((i) => ({ id: i.id, label: i.title })),
  ]

  const filteredDocs =
    activeCategory === "todos"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.category === activeCategory)

  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#F5F5F5]/20 uppercase mb-8">
          <Link href="/" className="hover:text-[#B11212] transition-colors duration-500">
            Portal
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F5F5]/40">Arquivos</span>
        </div>

        <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl tracking-[0.15em] text-[#F5F5F5] mb-4">
          Arquivos da Ordem
        </h1>
        <div className="w-16 h-px bg-[#8B0000]/40" />

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 border ${
                activeCategory === cat.id
                  ? "border-[#8B0000] text-[#F5F5F5] bg-[#8B0000]/10"
                  : "border-[#1A1A1F] text-[#F5F5F5]/30 hover:border-[#8B0000]/30 hover:text-[#F5F5F5]/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Documents Grid */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => {
            const hasAccess = canAccess(doc.requiredLevel)

            // ✅ novo: destino do card
            const href = getDocHref(doc)

            // ✅ regra de clique: só entra se released e tem acesso
            const disabled = !doc.released || !hasAccess

            return (
              <Link
                key={doc.id}
                href={disabled ? "#" : href}
                aria-disabled={disabled}
                className={`group relative overflow-hidden border border-[#1A1A1F] bg-[#0B0B10]/60 transition-all duration-700 hover:border-[#8B0000]/30 ${
                  disabled ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden light-sweep">
                  <Image
                    src={doc.cover}
                    alt={doc.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/60 to-transparent" />

                  {/* Lock */}
                  {!hasAccess && doc.released && (
                    <div className="absolute top-3 right-3 p-2 bg-[#050507]/80 border border-[#1A1A1F]">
                      <Lock className="w-3.5 h-3.5 text-[#8B0000]" />
                    </div>
                  )}

                  {/* Preparing */}
                  {!doc.released && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050507]/60">
                      <span className="font-[var(--font-cinzel)] text-xs tracking-[0.3em] text-[#8B0000]/60 uppercase">
                        Em Preparação
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-[10px] tracking-[0.3em] text-[#8B0000] uppercase mb-2 font-[var(--font-cinzel)]">
                    {doc.subtitle}
                  </p>
                  <h3 className="font-[var(--font-cinzel)] text-lg tracking-wide text-[#F5F5F5] mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-[#F5F5F5]/30 leading-relaxed line-clamp-2 mb-4">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#F5F5F5]/20">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {doc.readTime}
                    </div>
                    <span className="text-[10px] tracking-[0.1em] uppercase">{doc.requiredLevel}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1A1A1F] py-8 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/20 uppercase font-[var(--font-cinzel)]">
          Arquivo Arcano — Biblioteca Oculta
        </p>
      </footer>
    </main>
  )
}

export default function ArquivosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050507] flex items-center justify-center">
          <div className="w-6 h-6 border border-[#8B0000]/40 rotate-45 animate-pulse" />
        </main>
      }
    >
      <ArchivesContent />
    </Suspense>
  )
}

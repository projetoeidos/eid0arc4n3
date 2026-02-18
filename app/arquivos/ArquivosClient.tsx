"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { Lock, Clock, ChevronRight } from "lucide-react"

type UserLevel = "VISITANTE" | "INICIADO" | "ADEPTO" | "CONSELHO 33"

type DocRow = {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  cover_url: string | null
  category: string | null
  required_level: UserLevel
  read_time: string | null
  released: boolean
}

const LEVEL_INDEX: Record<UserLevel, number> = {
  VISITANTE: 0,
  INICIADO: 1,
  ADEPTO: 2,
  "CONSELHO 33": 3,
}

function canAccess(userLevel: UserLevel, required: UserLevel) {
  return LEVEL_INDEX[userLevel] >= LEVEL_INDEX[required]
}

export function ArquivosClient({
  docs,
  userLevel,
}: {
  docs: DocRow[]
  userLevel: UserLevel
}) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    docs.forEach((d) => set.add(d.category || "Arquivo"))
    return ["todos", ...Array.from(set)]
  }, [docs])

  const [activeCategory, setActiveCategory] = useState("todos")

  const filteredDocs =
    activeCategory === "todos"
      ? docs
      : docs.filter((d) => (d.category || "Arquivo") === activeCategory)

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

        <div className="mt-4 text-[10px] tracking-[0.2em] text-[#F5F5F5]/25 uppercase">
          Seu nível: <span className="text-[#F5F5F5]/60">{userLevel}</span>
        </div>

        {/* Filtro */}
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 border ${
                activeCategory === cat
                  ? "border-[#8B0000] text-[#F5F5F5] bg-[#8B0000]/10"
                  : "border-[#1A1A1F] text-[#F5F5F5]/30 hover:border-[#8B0000]/30 hover:text-[#F5F5F5]/60"
              }`}
            >
              {cat === "todos" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => {
            const hasAccess = canAccess(userLevel, doc.required_level)
            const disabled = !doc.released || !hasAccess

            return (
              <Link
                key={doc.id}
                href={disabled ? "#" : `/arquivos/${doc.slug}`}
                className={`group relative overflow-hidden border border-[#1A1A1F] bg-[#0B0B10]/60 transition-all duration-700 hover:border-[#8B0000]/30 ${
                  disabled ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  {doc.cover_url ? (
                    <Image
                      src={doc.cover_url}
                      alt={doc.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0B0B10]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/60 to-transparent" />

                  {!hasAccess && doc.released && (
                    <div className="absolute top-3 right-3 p-2 bg-[#050507]/80 border border-[#1A1A1F]">
                      <Lock className="w-3.5 h-3.5 text-[#8B0000]" />
                    </div>
                  )}

                  {!doc.released && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050507]/60">
                      <span className="text-xs tracking-[0.3em] text-[#8B0000]/60 uppercase">
                        Em Preparação
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-[10px] tracking-[0.3em] text-[#8B0000] uppercase mb-2">
                    {doc.subtitle || "REGISTRO"}
                  </p>

                  <h3 className="font-[var(--font-cinzel)] text-lg text-[#F5F5F5] mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-[#F5F5F5]/30 leading-relaxed line-clamp-2 mb-4">
                    {doc.description || "—"}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#F5F5F5]/20">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {doc.read_time || "—"}
                    </div>
                    <span className="uppercase">{doc.required_level}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <footer className="border-t border-[#1A1A1F] py-8 text-center">
        <p className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/20 uppercase">
          Arquivo Arcano — Biblioteca Oculta
        </p>
      </footer>
    </main>
  )
}

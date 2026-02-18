"use client"

import { use, useState } from "react"
import Link from "next/link"
import { DOCUMENTS } from "@/lib/mock-data"
import { useProgression } from "@/lib/progression-context"
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, CheckCircle2, X } from "lucide-react"

export default function LeitorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const doc = DOCUMENTS.find((d) => d.id === id)
  const { state, canAccess, completeDoc, toggleBookmark } = useProgression()
  const [currentPage, setCurrentPage] = useState(0)
  const [completed, setCompleted] = useState(false)

  if (!doc || !canAccess(doc.requiredLevel)) {
    return (
      <main className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-cinzel)] text-2xl text-[#F5F5F5]/50">Acesso Negado</h1>
          <Link href="/arquivos" className="mt-6 inline-block text-sm text-[#8B0000] hover:text-[#B11212] transition-colors">
            Voltar aos Arquivos
          </Link>
        </div>
      </main>
    )
  }

  const totalPages = doc.content.length
  const isBookmarked = state.bookmarks.includes(doc.id)
  const isCompleted = state.completedDocs.includes(doc.id) || completed

  const handleComplete = () => {
    completeDoc(doc.id)
    setCompleted(true)
  }

  return (
    <main className="relative min-h-screen bg-[#050507] flex flex-col">
      {/* Reader Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#050507]/95 backdrop-blur-md border-b border-[#1A1A1F]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
          <Link
            href={`/documento/${doc.id}`}
            className="flex items-center gap-2 text-xs text-[#F5F5F5]/40 hover:text-[#B11212] transition-colors duration-500"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Fechar</span>
          </Link>

          <div className="flex flex-col items-center">
            <span className="font-[var(--font-cinzel)] text-xs tracking-[0.2em] text-[#F5F5F5]/60">
              {doc.title}
            </span>
            <span className="text-[10px] text-[#F5F5F5]/20 mt-0.5">
              {currentPage + 1} de {totalPages}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(doc.id)}
            className="p-2 text-[#F5F5F5]/30 hover:text-[#B11212] transition-colors duration-500"
            aria-label={isBookmarked ? "Remover marcador" : "Adicionar marcador"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-[#B11212]" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-[#1A1A1F]">
          <div
            className="h-full bg-[#8B0000] transition-all duration-700"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-32 px-6">
        <article className="w-full max-w-2xl">
          {/* Document "page" */}
          <div className="relative border border-[#1A1A1F] bg-[#0B0B10]/40 p-8 sm:p-12 md:p-16 min-h-[60vh]">
            {/* Red accent border */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B0000]/20 to-transparent" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B0000]/20 to-transparent" />

            <div className="prose prose-invert max-w-none">
              {doc.content[currentPage].split("\n\n").map((paragraph, i) => {
                if (i === 0 && paragraph.includes(" - ")) {
                  const [chapterTitle, ...rest] = paragraph.split("\n")
                  return (
                    <div key={i}>
                      <h2 className="font-[var(--font-cinzel)] text-xl sm:text-2xl tracking-[0.1em] text-[#F5F5F5] mb-8">
                        {chapterTitle}
                      </h2>
                      {rest.map((line, j) => (
                        <p key={j} className="text-sm sm:text-base text-[#F5F5F5]/50 leading-[1.8] mb-4">
                          {line}
                        </p>
                      ))}
                    </div>
                  )
                }
                return (
                  <p key={i} className="text-sm sm:text-base text-[#F5F5F5]/50 leading-[1.8] mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        </article>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100] bg-[#050507]/95 backdrop-blur-md border-t border-[#1A1A1F]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-2 text-xs text-[#F5F5F5]/40 hover:text-[#B11212] transition-colors duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {currentPage === totalPages - 1 && !isCompleted && (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 bg-[#8B0000] text-[#F5F5F5] font-[var(--font-cinzel)] text-[10px] tracking-[0.2em] uppercase border border-[#8B0000] hover:bg-[#B11212] transition-all duration-500"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Marcar como Concluído
            </button>
          )}

          {isCompleted && (
            <div className="flex items-center gap-2 text-xs text-[#8B0000]">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-[var(--font-cinzel)] tracking-[0.2em]">Concluído</span>
            </div>
          )}

          {currentPage < totalPages - 1 && !isCompleted && (
            <div />
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 text-xs text-[#F5F5F5]/40 hover:text-[#B11212] transition-colors duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </main>
  )
}

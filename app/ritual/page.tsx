"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { PLANS } from "@/lib/mock-data"
import { useProgression, LEVELS } from "@/lib/progression-context"
import { ChevronRight, Check, Lock } from "lucide-react"

export default function RitualPage() {
  const { state, canAccess } = useProgression()

  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      <section className="pt-28 pb-8 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#F5F5F5]/20 uppercase mb-8">
          <Link href="/" className="hover:text-[#B11212] transition-colors duration-500">Portal</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F5F5]/40">Ritual de Acesso</span>
        </div>

        <div className="text-center mb-16">
          <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl tracking-[0.15em] text-[#F5F5F5] mb-4">
            Ritual de Acesso
          </h1>
          <p className="text-sm text-[#F5F5F5]/30 leading-relaxed max-w-lg mx-auto">
            Cada nível da Ordem desvela novos segredos. Escolha seu caminho de ascensão.
          </p>
          <div className="w-16 h-px bg-[#8B0000]/40 mx-auto mt-6" />

          {/* Current Level */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 border border-[#1A1A1F] bg-[#0B0B10]/50">
            <div className="w-2 h-2 rounded-full bg-[#8B0000] shadow-[0_0_6px_rgba(139,0,0,0.5)]" />
            <span className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/50 uppercase font-[var(--font-cinzel)]">
              Nível atual: {state.level}
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, index) => {
            const alreadyHas = canAccess(plan.level)
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col border bg-[#0B0B10]/60 p-8 transition-all duration-700 ${
                  index === 2
                    ? "border-[#8B0000]/40 shadow-[0_0_30px_rgba(139,0,0,0.1)]"
                    : "border-[#1A1A1F] hover:border-[#8B0000]/20"
                }`}
              >
                {/* Glow border for highest tier */}
                {index === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/5 to-transparent pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Level badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rotate-45 border ${index === 2 ? "border-[#B11212] bg-[#8B0000]/20" : "border-[#8B0000]/30"}`} />
                    <span className="text-[10px] tracking-[0.3em] text-[#8B0000] uppercase font-[var(--font-cinzel)]">
                      {plan.level}
                    </span>
                  </div>

                  <h3 className="font-[var(--font-cinzel)] text-lg tracking-[0.1em] text-[#F5F5F5] mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#F5F5F5]/30 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[10px] text-[#F5F5F5]/20 uppercase">R$</span>
                    <span className="font-[var(--font-cinzel)] text-3xl text-[#F5F5F5]">{plan.price}</span>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#F5F5F5]/40">
                        <Check className="w-3.5 h-3.5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {alreadyHas ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-3 border border-[#1A1A1F] text-[#F5F5F5]/30">
                      <Check className="w-4 h-4 text-[#8B0000]" />
                      <span className="text-xs tracking-[0.2em] uppercase font-[var(--font-cinzel)]">Desbloqueado</span>
                    </div>
                  ) : (
                    <Link
                      href={`/pix/${plan.id}`}
                      className={`flex items-center justify-center gap-2 px-6 py-3 font-[var(--font-cinzel)] text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                        index === 2
                          ? "bg-[#8B0000] text-[#F5F5F5] border border-[#8B0000] hover:bg-[#B11212] btn-breathe"
                          : "bg-[#8B0000]/10 text-[#F5F5F5] border border-[#8B0000]/30 hover:bg-[#8B0000]/20"
                      }`}
                    >
                      Gerar Chave PIX
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
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

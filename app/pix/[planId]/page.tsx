"use client"

import { use, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Particles } from "@/components/particles"
import { PLANS } from "@/lib/mock-data"
import { useProgression } from "@/lib/progression-context"
import { CheckCircle2, Clock, Loader2 } from "lucide-react"

type PaymentStatus = "generating" | "waiting" | "validating" | "approved"

const STATUS_MESSAGES: Record<PaymentStatus, string> = {
  generating: "Gerando Chave de Acesso...",
  waiting: "Aguardando validação do ritual...",
  validating: "Validando...",
  approved: "Acesso concedido.",
}

export default function PixPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = use(params)
  const router = useRouter()
  const plan = PLANS.find((p) => p.id === planId)
  const { setLevel, incrementRituals } = useProgression()
  const [status, setStatus] = useState<PaymentStatus>("generating")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes

  const handleApproval = useCallback(() => {
    if (!plan) return
    setLevel(plan.level)
    incrementRituals()
    setTimeout(() => router.push("/arquivos"), 2500)
  }, [plan, setLevel, incrementRituals, router])

  // Simulate payment flow
  useEffect(() => {
    const t1 = setTimeout(() => setStatus("waiting"), 2000)
    const t2 = setTimeout(() => setStatus("validating"), 8000)
    const t3 = setTimeout(() => {
      setStatus("approved")
      handleApproval()
    }, 11000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [handleApproval])

  // Timer
  useEffect(() => {
    if (status === "approved") return
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  if (!plan) {
    return (
      <main className="min-h-screen bg-[#050507] flex items-center justify-center">
        <p className="text-[#F5F5F5]/50 font-[var(--font-cinzel)]">Plano não encontrado.</p>
      </main>
    )
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <main className="relative min-h-screen bg-[#050507] flex items-center justify-center">
      <Particles />

      {/* Darker overlay */}
      <div className="absolute inset-0 bg-[#050507]/40" />

      {/* Red glow edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#8B0000]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8B0000]/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="border border-[#1A1A1F] bg-[#0B0B10]/80 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-10 h-10 mx-auto mb-6 border border-[#8B0000]/30 rotate-45 flex items-center justify-center">
              <div className="w-6 h-6 border border-[#8B0000]/20 flex items-center justify-center -rotate-45">
                {status === "approved" ? (
                  <CheckCircle2 className="w-4 h-4 text-[#8B0000]" />
                ) : status === "validating" ? (
                  <Loader2 className="w-4 h-4 text-[#8B0000] animate-spin" />
                ) : (
                  <span className="font-[var(--font-cinzel)] text-[#8B0000] text-[10px] font-bold">33</span>
                )}
              </div>
            </div>

            <h1 className="font-[var(--font-cinzel)] text-lg sm:text-xl tracking-[0.15em] text-[#F5F5F5] mb-2">
              {STATUS_MESSAGES[status]}
            </h1>
            <p className="text-xs text-[#F5F5F5]/30 font-[var(--font-cinzel)] tracking-[0.2em]">
              {plan.name}
            </p>
          </div>

          {/* QR Code Placeholder */}
          {status !== "approved" && (
            <>
              <div className="relative w-48 h-48 mx-auto mb-6 border border-[#1A1A1F] bg-[#F5F5F5] p-3">
                {/* Simulated QR pattern */}
                <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-px">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.4 ? "bg-[#050507]" : "bg-[#F5F5F5]"}`}
                    />
                  ))}
                </div>
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-[#F5F5F5] flex items-center justify-center border border-[#1A1A1F]">
                    <span className="font-[var(--font-cinzel)] text-[#8B0000] text-xs font-bold">33</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-[#F5F5F5]/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono text-[#F5F5F5]/50">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-6 py-4 border-t border-b border-[#1A1A1F]">
                <span className="text-[10px] text-[#F5F5F5]/20 uppercase tracking-wider">Valor</span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-xs text-[#F5F5F5]/40">R$</span>
                  <span className="font-[var(--font-cinzel)] text-2xl text-[#F5F5F5]">{plan.price}</span>
                </div>
              </div>
            </>
          )}

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-3">
            {status === "generating" && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-[#8B0000] animate-spin" />
                <span className="text-xs text-[#F5F5F5]/30">Preparando ritual...</span>
              </div>
            )}
            {status === "waiting" && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse" />
                <span className="text-xs text-[#F5F5F5]/30">Aguardando pagamento...</span>
              </div>
            )}
            {status === "validating" && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-[#B11212] animate-spin" />
                <span className="text-xs text-[#B11212]">Validando ritual...</span>
              </div>
            )}
            {status === "approved" && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#8B0000]" />
                  <span className="text-sm text-[#F5F5F5] font-[var(--font-cinzel)] tracking-[0.2em]">
                    Acesso Concedido
                  </span>
                </div>
                <p className="text-xs text-[#F5F5F5]/30">Redirecionando aos arquivos...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

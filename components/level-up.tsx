"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useProgression } from "@/lib/progression-context"

export function LevelUpCeremony({ level, onClose }: { level: string; onClose: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1500)
    const t3 = setTimeout(() => setPhase(3), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050507]/95 backdrop-blur-sm">
      <div className="text-center px-6 max-w-md">
        {/* Symbol */}
        <div className={`mx-auto mb-8 transition-all duration-[1500ms] ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="w-20 h-20 mx-auto border border-[#8B0000]/50 rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(139,0,0,0.3)]">
            <div className="w-14 h-14 border border-[#8B0000]/30 flex items-center justify-center -rotate-45">
              <span className="font-[var(--font-cinzel)] text-[#B11212] text-2xl font-bold">33</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className={`font-[var(--font-cinzel)] text-2xl sm:text-3xl tracking-[0.2em] text-[#F5F5F5] mb-4 transition-all duration-[1500ms] ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Ascensão Completa
        </h2>

        {/* Level */}
        <p className={`font-[var(--font-cinzel)] text-sm tracking-[0.4em] text-[#8B0000] uppercase mb-6 transition-all duration-[1500ms] ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
          {level}
        </p>

        {/* Message */}
        <p className={`text-sm text-[#F5F5F5]/40 italic leading-relaxed mb-10 transition-all duration-[1500ms] ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          {"\"A Ordem reconhece sua dedicação. Novos segredos foram revelados.\""}
        </p>

        {/* Continue */}
        <button
          onClick={onClose}
          className={`px-8 py-3 bg-[#8B0000] text-[#F5F5F5] font-[var(--font-cinzel)] text-xs tracking-[0.3em] uppercase border border-[#8B0000] hover:bg-[#B11212] transition-all duration-500 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export function ProgressIndicator() {
  const { state } = useProgression()

  const levels = ["VISITANTE", "INICIADO", "ADEPTO", "CONSELHO 33"]
  const currentIndex = levels.indexOf(state.level)

  return (
    <div className="flex items-center gap-3">
      {levels.map((level, i) => (
        <div key={level} className="flex items-center gap-3">
          <div className={`flex flex-col items-center gap-1`}>
            <div
              className={`w-3 h-3 rotate-45 border transition-all duration-500 ${
                i <= currentIndex
                  ? "border-[#8B0000] bg-[#8B0000]/20 shadow-[0_0_8px_rgba(139,0,0,0.3)]"
                  : "border-[#1A1A1F]"
              }`}
            />
            <span className={`text-[8px] tracking-[0.1em] uppercase transition-colors duration-500 ${
              i <= currentIndex ? "text-[#8B0000]" : "text-[#F5F5F5]/15"
            }`}>
              {level}
            </span>
          </div>
          {i < levels.length - 1 && (
            <div className={`w-6 h-px transition-colors duration-500 -mt-3 ${
              i < currentIndex ? "bg-[#8B0000]/40" : "bg-[#1A1A1F]"
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

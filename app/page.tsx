import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Particles } from "@/components/particles"
import { IntentionsSection, RecentlyReleasedSection, ClassifiedSection, RetentionMessage, SectionDivider } from "@/components/home-sections"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />
      <Hero />
      <IntentionsSection />
      <SectionDivider />
      <RecentlyReleasedSection />
      <SectionDivider />
      <ClassifiedSection />
      <SectionDivider />
      <RetentionMessage />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1A1A1F] py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-6 h-6 border border-[#8B0000]/30 flex items-center justify-center rotate-45">
            <span className="font-[var(--font-cinzel)] text-[#8B0000]/50 text-[8px] font-bold -rotate-45">33</span>
          </div>
        </div>
        <p className="text-[10px] tracking-[0.3em] text-[#F5F5F5]/20 uppercase font-[var(--font-cinzel)]">
          Arquivo Arcano — Biblioteca Oculta
        </p>
        <p className="mt-2 text-[10px] text-[#F5F5F5]/10">
          {"Todos os direitos reservados pela Ordem."}
        </p>
      </footer>
    </main>
  )
}

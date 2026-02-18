import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { supabaseServer } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ArquivoSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = supabaseServer()
  const slug = params.slug

  const { data: doc, error: docError } = await supabase
    .from("documents")
    .select("id,slug,title,subtitle,description,cover_url,required_level,released")
    .eq("slug", slug)
    .maybeSingle()

  if (docError) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1>Erro ao buscar documento</h1>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>{docError.message}</pre>
        <Link href="/arquivos" style={{ display: "block", marginTop: 16 }}>
          Voltar
        </Link>
      </main>
    )
  }

  if (!doc || !doc.released) return notFound()

  // capítulos (RLS decide se o usuário pode ver)
  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("position,title,body")
    .eq("document_id", doc.id)
    .order("position", { ascending: true })

  const blocked = !!chaptersError || !chapters || chapters.length === 0

  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      <section className="pt-28 pb-10 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Capa */}
          <div className="relative w-full lg:w-1/2 aspect-[3/4] max-h-[600px] overflow-hidden border border-[#1A1A1F]">
            {doc.cover_url ? (
              <Image src={doc.cover_url} alt={doc.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[#0B0B10]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-[#050507]/30" />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.4em] text-[#8B0000] uppercase mb-4">
              {doc.subtitle || "REGISTRO"}
            </p>

            <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl text-[#F5F5F5] mb-6">
              {doc.title}
            </h1>

            <p className="text-sm text-[#F5F5F5]/40 leading-relaxed mb-8">
              {doc.description || "—"}
            </p>

            <div className="text-xs text-[#F5F5F5]/30">
              Requer nível: <span className="text-[#F5F5F5]/60">{doc.required_level}</span>
            </div>

            <Link
              href="/arquivos"
              className="mt-6 text-sm text-[#8B0000] hover:text-[#B11212] transition-colors"
            >
              ← Voltar aos Arquivos
            </Link>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        {blocked ? (
          <div className="border border-[#1A1A1F] bg-[#0B0B10]/60 p-10">
            <h2 className="font-[var(--font-cinzel)] text-xl text-[#F5F5F5]">
              Conteúdo restrito
            </h2>
            <p className="mt-3 text-sm text-[#F5F5F5]/40 leading-relaxed">
              Este registro exige um nível acima do seu acesso atual (ou você ainda não está logado).
            </p>

            {chaptersError ? (
              <pre className="mt-6 text-xs text-[#F5F5F5]/20 whitespace-pre-wrap">
                {chaptersError.message}
              </pre>
            ) : null}
          </div>
        ) : (
          <div className="space-y-6">
            {chapters.map((c) => (
              <section key={c.position} className="border border-[#1A1A1F] bg-[#0B0B10]/60 p-10">
                <div className="text-[10px] tracking-[0.3em] text-[#8B0000]/70 uppercase">
                  Capítulo {c.position}
                </div>
                <h2 className="font-[var(--font-cinzel)] text-xl text-[#F5F5F5] mt-2">
                  {c.title}
                </h2>
                <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-[#F5F5F5]/40">
                  {c.body}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { DOCUMENTS } from "@/lib/mock-data"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"

export const dynamicParams = false

export function generateStaticParams() {
  return DOCUMENTS
    .filter((d: any) => d.released)
    .flatMap((d: any) => {
      const params = [{ slug: d.id }]
      if (d.slug) params.push({ slug: d.slug })
      return params
    })
}

interface PageProps {
  params: { slug: string }
}

export default function ArquivoSlugPage({ params }: PageProps) {
  const doc = DOCUMENTS.find((d: any) => d.id === params.slug || d.slug === params.slug)

  if (!doc) {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1>DEBUG: doc não encontrado</h1>
      <p>params.slug: <b>{params.slug}</b></p>
      <p>slugs disponíveis:</p>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {DOCUMENTS.map(d => `${d.id} | ${d.slug}`).join("\n")}
      </pre>
      <Link href="/arquivos">Voltar</Link>
    </main>
  )
}

if (!doc.released) {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1>DEBUG: doc existe mas released=false</h1>
      <p>id: {doc.id}</p>
      <p>slug: {doc.slug}</p>
      <Link href="/arquivos">Voltar</Link>
    </main>
  )
}

  const pdfUrl = (doc as any).pdfUrl // esperado: "/pdfs/sao-cipriano.pdf"
  const content = (doc as any).content as string[] | undefined

  return (
    <main className="relative min-h-screen bg-[#050507]">
      <Particles />
      <Navbar />

      <section className="pt-28 pb-10 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Capa */}
          <div className="relative w-full lg:w-1/2 aspect-[3/4] max-h-[600px] overflow-hidden border border-[#1A1A1F]">
            <Image src={doc.cover} alt={doc.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-[#050507]/30" />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.4em] text-[#8B0000] uppercase mb-4">
              {doc.subtitle}
            </p>

            <h1 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl text-[#F5F5F5] mb-6">
              {doc.title}
            </h1>

            <p className="text-sm text-[#F5F5F5]/40 leading-relaxed mb-8">
              {doc.description}
            </p>

            {/* Botões */}
            {pdfUrl ? (
              <div className="flex flex-wrap gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#8B0000] text-[#F5F5F5] font-[var(--font-cinzel)] text-sm tracking-[0.3em] uppercase border border-[#8B0000] hover:bg-[#B11212] transition-all duration-700"
                >
                  Ler Agora
                </a>
                <a
                  href="#leitor"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#0B0B10]/60 text-[#F5F5F5]/70 font-[var(--font-cinzel)] text-sm tracking-[0.3em] uppercase border border-[#1A1A1F] hover:border-[#8B0000]/30 hover:text-[#F5F5F5] transition-all duration-700"
                >
                  Abrir no Leitor
                </a>
              </div>
            ) : null}

            <Link
              href="/arquivos"
              className="mt-6 text-sm text-[#8B0000] hover:text-[#B11212] transition-colors"
            >
              ← Voltar aos Arquivos
            </Link>
          </div>
        </div>
      </section>

      {/* Leitor */}
      {pdfUrl ? (
        <section id="leitor" className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="border border-[#1A1A1F] bg-[#0B0B10]/60 overflow-hidden">
            <div className="h-[80vh]">
              <iframe src={pdfUrl} className="w-full h-full" />
            </div>
          </div>
        </section>
      ) : content?.length ? (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="border border-[#1A1A1F] bg-[#0B0B10]/60 p-10">
            {content.map((block, i) => (
              <p key={i} className="whitespace-pre-wrap text-sm leading-relaxed text-[#F5F5F5]/40 mb-6">
                {block}
              </p>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

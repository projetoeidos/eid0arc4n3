import { Suspense } from "react"
import { supabaseServer } from "@/lib/supabase/server"
import { ArquivosClient } from "./ArquivosClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

type UserLevel = "VISITANTE" | "INICIADO" | "ADEPTO" | "CONSELHO 33"

export default async function ArquivosPage() {
  const supabase = supabaseServer()

  // user (se não estiver logado, segue como VISITANTE)
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id || null

  let userLevel: UserLevel = "VISITANTE"

  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("level")
      .eq("id", userId)
      .maybeSingle()

    if (profile?.level) userLevel = profile.level
  }

  const { data: docs, error } = await supabase
    .from("documents")
    .select("id,slug,title,subtitle,description,cover_url,category,required_level,read_time,released")
    .eq("released", true)
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-[#050507] text-white p-10">
        <h1>Erro ao carregar documentos</h1>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>{error.message}</pre>
      </main>
    )
  }

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050507] flex items-center justify-center">
          <div className="w-6 h-6 border border-[#8B0000]/40 rotate-45 animate-pulse" />
        </main>
      }
    >
      <ArquivosClient docs={(docs as any) || []} userLevel={userLevel} />
    </Suspense>
  )
}

import { redirect } from "next/navigation"
import { getDocBySlugOrId, getDocHref } from "@/lib/mock-data"

export default function DocumentoLegacy({ params }: { params: { id: string } }) {
  const doc = getDocBySlugOrId(params.id)
  if (!doc) redirect("/arquivos")
  redirect(getDocHref(doc))
}

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Cinzel } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ProgressionProvider } from "@/lib/progression-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Arquivo Arcano — Biblioteca Oculta",
  description: "Escolha sua intenção. Desbloqueie o conhecimento proibido.",
}

export const viewport: Viewport = {
  themeColor: "#050507",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased bg-[#050507] text-[#F5F5F5] film-grain vignette red-side-glow`}>
        <ProgressionProvider>
          {children}
        </ProgressionProvider>
        <Analytics />
      </body>
    </html>
  )
}

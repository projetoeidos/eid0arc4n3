import type { Metadata, Viewport } from "next"
import { TelegramRedirect } from "../../components/telegram-redirect"

export const metadata: Metadata = {
  title: "Abrindo o Telegram…",
  description: "Aguarde alguns segundos enquanto abrimos o atendimento no Telegram.",
  robots: { index: false, follow: false },
  referrer: "strict-origin-when-cross-origin",
}

export const viewport: Viewport = {
  themeColor: "#07121d",
}

export default function CrisVipPage() {
  return <TelegramRedirect botUrl="https://t.me/CristinabrBot" source="crisvip" />
}

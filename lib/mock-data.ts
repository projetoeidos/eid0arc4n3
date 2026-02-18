export type UserLevel = "VISITANTE" | "INICIADO" | "ADEPTO" | "CONSELHO 33"

export const LEVELS: UserLevel[] = ["VISITANTE", "INICIADO", "ADEPTO", "CONSELHO 33"]

export const LEVEL_INDEX: Record<UserLevel, number> = {
  VISITANTE: 0,
  INICIADO: 1,
  ADEPTO: 2,
  "CONSELHO 33": 3,
}

export interface Document {
  id: string
  title: string
  subtitle: string
  description: string
  cover: string
  category: string
  requiredLevel: UserLevel
  readTime: string
  released: boolean
  preparingUntil?: string
  content: string[]
}

export interface Update {
  id: string
  type: "liberado" | "preparacao" | "proxima" | "aviso"
  title: string
  description: string
  date: string
  countdown?: string
}

export interface Plan {
  id: string
  level: UserLevel
  name: string
  description: string
  price: string
  features: string[]
}

export const INTENTIONS = [
  { id: "poder", title: "Poder Oculto", description: "Desbloqueie forças que transcendem a compreensão comum.", icon: "flame" },
  { id: "conhecimento", title: "Conhecimento Proibido", description: "Acesse registros que foram ocultados por séculos.", icon: "book" },
  { id: "transformacao", title: "Transformação Interior", description: "Inicie o processo de metamorfose iniciática.", icon: "eye" },
  { id: "protecao", title: "Proteção Arcana", description: "Aprenda os selos e defesas ancestrais.", icon: "shield" },
]

export const DOCUMENTS: Document[] = [
  {
    id: "manuscrito-das-sombras",
    title: "São Cipriano: O Livro das Chaves Ocultas",
    subtitle: "Grimório da Capa Negra",
    description: "Um dos grimórios mais controversos já preservados nos registros da Ordem. Atribuído a São Cipriano, o Bruxo de Antioquia, este manuscrito reúne rituais, invocações, proteções espirituais e fórmulas que atravessaram séculos sob véu de silêncio. Entre orações, pactos simbólicos e chaves de poder, este códice não é apenas leitura — é portal. Acesso restrito a iniciados.",
    cover: "/covers/registro-01.webp",
    category: "poder",
    requiredLevel: "VISITANTE",
    readTime: "25 min",
    released: true,
    content: [
      "Capítulo I - O Despertar\n\nNas profundezas do silêncio, onde a razão comum não alcança, reside o primeiro portal. Os antigos sabiam que o verdadeiro poder não vem do exterior, mas de uma fonte interna que poucos ousam acessar.\n\nAntes de prosseguir, saiba: o que está prestes a ler não pode ser deslido. O conhecimento, uma vez absorvido, altera permanentemente a percepção do iniciado.",
      "Capítulo II - Os Selos Primordiais\n\nHá sete selos que guardam o conhecimento arcano. Cada selo corresponde a um estágio de consciência. O primeiro selo é o do Reconhecimento — reconhecer que existe algo além do que os olhos físicos podem ver.\n\nO segundo selo é o da Aceitação — aceitar que o mundo visível é apenas uma fração da realidade completa.",
      "Capítulo III - A Primeira Chave\n\nA Primeira Chave não é um objeto, mas um estado de ser. Ela se manifesta quando o iniciado atinge o equilíbrio entre o conhecimento racional e a intuição primordial.\n\nPratique o exercício a seguir em completo silêncio, preferencialmente nas horas que precedem o amanhecer...",
    ],
  },
  {
    id: "codex-vermelho",
    title: "Codex Vermelho",
    subtitle: "Liber Sanguinis",
    description: "O registro mais controverso da Ordem. Detalha os rituais de sangue simbólico e as práticas de transmutação energética. Acesso restrito a Iniciados.",
    cover: "/images/doc-cover-2.jpg",
    category: "conhecimento",
    requiredLevel: "INICIADO",
    readTime: "40 min",
    released: true,
    content: [
      "Prefácio\n\nEste codex foi compilado ao longo de sete gerações de mestres da Ordem. Cada palavra foi escolhida com precisão cirúrgica, pois no caminho arcano, a linguagem é mais do que comunicação — é invocação.\n\nO sangue mencionado nestes textos é simbólico. Representa a essência vital, a força que anima toda a criação.",
      "Capítulo I - A Transmutação\n\nA transmutação não é alquimia no sentido literal. É o processo pelo qual o iniciado transforma seus padrões energéticos, elevando sua frequência vibracional além dos limites impostos pela consciência ordinária.",
      "Capítulo II - Os Rituais do Amanhecer\n\nNas tradições mais antigas, o amanhecer era considerado o momento de maior potência. O véu entre os mundos se torna mais fino, e as forças arcanas fluem com maior intensidade.",
    ],
  },
  {
    id: "atlas-dos-portais",
    title: "Atlas dos Portais",
    subtitle: "Cartographia Dimensionum",
    description: "Mapas e descrições detalhadas dos pontos de convergência energética ao redor do mundo. Documento classificado como Nível Adepto.",
    cover: "/images/doc-cover-3.jpg",
    category: "transformacao",
    requiredLevel: "ADEPTO",
    readTime: "55 min",
    released: true,
    content: [
      "Introdução ao Atlas\n\nOs portais não são ficção. São pontos geográficos onde as linhas de energia da Terra convergem, criando zonas de intensidade extraordinária. Os antigos construíram templos sobre esses pontos, e as tradições esotéricas os mapearam ao longo de milênios.",
      "Seção I - Os Portais do Hemisfério Sul\n\nO Hemisfério Sul abriga alguns dos portais mais potentes e menos documentados. A Ordem manteve registros secretos desses locais, protegendo-os de exploradores não iniciados.",
    ],
  },
  {
    id: "protocolo-33",
    title: "Protocolo 33",
    subtitle: "Arcanum Supremum",
    description: "O documento supremo da Ordem. Contém os protocolos finais de ascensão. Disponível apenas para membros do Conselho 33.",
    cover: "/images/doc-cover-4.jpg",
    category: "protecao",
    requiredLevel: "CONSELHO 33",
    readTime: "1h 20min",
    released: true,
    content: [
      "PROTOCOLO 33 — CLASSIFICAÇÃO MÁXIMA\n\nSe você está lendo estas palavras, foi considerado digno pelo Conselho. Poucos alcançaram este nível desde a fundação da Ordem, e o que segue alterará permanentemente sua compreensão da realidade.",
    ],
  },
  {
    id: "cronicas-do-abismo",
    title: "Crônicas do Abismo",
    subtitle: "Em Preparação",
    description: "Um novo registro está sendo decifrado pelos Mestres da Ordem. Em breve será revelado aos dignos.",
    cover: "/images/doc-cover-1.jpg",
    category: "conhecimento",
    requiredLevel: "INICIADO",
    readTime: "???",
    released: false,
    preparingUntil: "2026-03-15T00:00:00",
    content: [],
  },
  {
    id: "livro-negro",
    title: "O Livro Negro de Khem",
    subtitle: "Em Preparação",
    description: "Oriundo das areias do antigo Egito, este registro promete revelar segredos há muito perdidos.",
    cover: "/images/doc-cover-3.jpg",
    category: "poder",
    requiredLevel: "ADEPTO",
    readTime: "???",
    released: false,
    preparingUntil: "2026-04-01T00:00:00",
    content: [],
  },
]

export const UPDATES: Update[] = [
  {
    id: "u1",
    type: "liberado",
    title: "O Manuscrito das Sombras",
    description: "O primeiro documento da Ordem foi liberado para todos os visitantes.",
    date: "2026-02-10",
  },
  {
    id: "u2",
    type: "preparacao",
    title: "Crônicas do Abismo",
    description: "Um novo documento está sendo decifrado. A Ordem revelará quando estiver pronto.",
    date: "2026-02-15",
  },
  {
    id: "u3",
    type: "proxima",
    title: "O Livro Negro de Khem",
    description: "Próxima liberação prevista. Prepare-se.",
    date: "2026-04-01",
    countdown: "2026-04-01T00:00:00",
  },
  {
    id: "u4",
    type: "aviso",
    title: "Aviso da Ordem",
    description: "A Ordem observou seu progresso. Continue no caminho e novas portas se abrirão.",
    date: "2026-02-17",
  },
]

export const PLANS: Plan[] = [
  {
    id: "iniciado",
    level: "INICIADO",
    name: "Ritual de Iniciação",
    description: "Torne-se um Iniciado e acesse os primeiros documentos classificados da Ordem.",
    price: "33,00",
    features: [
      "Acesso ao Codex Vermelho",
      "Central de Atualizações",
      "Marca de Iniciado no perfil",
      "Documentos de nível Iniciado",
    ],
  },
  {
    id: "adepto",
    level: "ADEPTO",
    name: "Ascensão ao Adeptado",
    description: "Eleve-se ao nível Adepto. Documentos de alto grau serão revelados.",
    price: "66,00",
    features: [
      "Tudo do nível Iniciado",
      "Atlas dos Portais",
      "Documentos classificados",
      "Acesso antecipado a novos arquivos",
      "Marca de Adepto no perfil",
    ],
  },
  {
    id: "conselho",
    level: "CONSELHO 33",
    name: "Conselho dos 33",
    description: "O nível supremo. Acesso total e irrestrito a todos os segredos da Ordem.",
    price: "99,00",
    features: [
      "Tudo do nível Adepto",
      "Protocolo 33",
      "Acesso vitalício",
      "Todos os documentos futuros",
      "Canal direto com a Ordem",
      "Marca do Conselho 33",
    ],
  },
]

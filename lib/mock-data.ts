// =============================================
// LEVELS
// =============================================
export type UserLevel = "VISITANTE" | "INICIADO" | "ADEPTO" | "CONSELHO 33";

export const LEVELS: UserLevel[] = ["VISITANTE", "INICIADO", "ADEPTO", "CONSELHO 33"];

export const LEVEL_INDEX: Record<UserLevel, number> = {
  VISITANTE: 0,
  INICIADO: 1,
  ADEPTO: 2,
  "CONSELHO 33": 3,
};

// =============================================
// TYPES
// =============================================
export interface Document {
  id: string;

  // URL bonita (opcional). Ex: /arquivos/sao-cipriano
  slug?: string;

  title: string;
  subtitle: string;
  description: string;
  cover: string;
  category: string;

  requiredLevel: UserLevel;
  readTime: string;

  released: boolean;
  preparingUntil?: string;

  // ✅ novo: PDF real (se existir, o leitor abre o PDF)
  pdfUrl?: string;

  // ✅ compatibilidade: se não tiver PDF, pode mostrar texto
  content?: string[];
}

export interface Update {
  id: string;
  type: "liberado" | "preparacao" | "proxima" | "aviso";
  title: string;
  description: string;
  date: string;
  countdown?: string;
}

export interface Plan {
  id: string;
  level: UserLevel;
  name: string;
  description: string;
  price: string;
  features: string[];
}

// =============================================
// INTENTIONS
// =============================================
export const INTENTIONS = [
  {
    id: "poder",
    title: "Poder Oculto",
    description: "Desbloqueie forças que transcendem a compreensão comum.",
    icon: "flame",
  },
  {
    id: "conhecimento",
    title: "Conhecimento Proibido",
    description: "Acesse registros que foram ocultados por séculos.",
    icon: "book",
  },
  {
    id: "transformacao",
    title: "Transformação Interior",
    description: "Inicie o processo de metamorfose iniciática.",
    icon: "eye",
  },
  {
    id: "protecao",
    title: "Proteção Arcana",
    description: "Aprenda os selos e defesas ancestrais.",
    icon: "shield",
  },
];

// =============================================
// DOCUMENTS
// Coloque PDFs em: /public/pdfs/
// Ex: public/pdfs/sao-cipriano.pdf -> pdfUrl: "/pdfs/sao-cipriano.pdf"
// =============================================
export const DOCUMENTS: Document[] = [
  {
    id: "manuscrito-das-sombras",
    slug: "sao-cipriano",
    title: "São Cipriano: O Livro das Chaves Ocultas",
    subtitle: "Grimório da Capa Negra",
    description:
      "Um dos grimórios mais controversos já preservados nos registros da Ordem. Atribuído a São Cipriano, o Bruxo de Antioquia, este manuscrito reúne rituais, invocações, proteções espirituais e fórmulas que atravessaram séculos sob véu de silêncio. Entre orações, pactos simbólicos e chaves de poder, este códice não é apenas leitura — é portal. Acesso sob responsabilidade.",
    cover: "/covers/registro-01.webp",
    category: "poder",
    requiredLevel: "VISITANTE",
    readTime: "25 min",
    released: true,

    // ✅ PDF real (coloque o arquivo em public/pdfs/)
    pdfUrl: "/pdfs/sao-cipriano.pdf",

    // opcional: mantenha content se quiser fallback (pode remover depois)
    content: [
      "Capítulo I - O Despertar\n\nNas profundezas do silêncio, onde a razão comum não alcança, reside o primeiro portal...",
      "Capítulo II - Os Selos Primordiais\n\nHá sete selos que guardam o conhecimento arcano...",
      "Capítulo III - A Primeira Chave\n\nA Primeira Chave não é um objeto, mas um estado de ser...",
    ],
  },

  {
    id: "codex-vermelho",
    slug: "codex-vermelho",
    title: "Codex Vermelho",
    subtitle: "Liber Sanguinis",
    description:
      "O registro mais controverso da Ordem. Detalha rituais simbólicos e práticas de transmutação energética. Acesso restrito a Iniciados.",
    cover: "/images/doc-cover-2.jpg",
    category: "conhecimento",
    requiredLevel: "INICIADO",
    readTime: "40 min",
    released: true,
    content: [
      "Prefácio\n\nEste codex foi compilado ao longo de sete gerações de mestres da Ordem...",
      "Capítulo I - A Transmutação\n\nA transmutação não é alquimia no sentido literal...",
      "Capítulo II - Os Rituais do Amanhecer\n\nNas tradições mais antigas, o amanhecer era considerado o momento de maior potência...",
    ],
  },

  {
    id: "atlas-dos-portais",
    slug: "atlas-dos-portais",
    title: "Atlas dos Portais",
    subtitle: "Cartographia Dimensionum",
    description:
      "Mapas e descrições dos pontos de convergência energética ao redor do mundo. Documento classificado como Nível Adepto.",
    cover: "/images/doc-cover-3.jpg",
    category: "transformacao",
    requiredLevel: "ADEPTO",
    readTime: "55 min",
    released: true,
    content: [
      "Introdução ao Atlas\n\nOs portais não são ficção. São pontos geográficos onde as linhas de energia da Terra convergem...",
      "Seção I - Os Portais do Hemisfério Sul\n\nO Hemisfério Sul abriga alguns dos portais mais potentes e menos documentados...",
    ],
  },

  {
    id: "protocolo-33",
    slug: "protocolo-33",
    title: "Protocolo 33",
    subtitle: "Arcanum Supremum",
    description:
      "O documento supremo da Ordem. Contém os protocolos finais de ascensão. Disponível apenas para membros do Conselho 33.",
    cover: "/images/doc-cover-4.jpg",
    category: "protecao",
    requiredLevel: "CONSELHO 33",
    readTime: "1h 20min",
    released: true,
    content: [
      "PROTOCOLO 33 — CLASSIFICAÇÃO MÁXIMA\n\nSe você está lendo estas palavras, foi considerado digno pelo Conselho...",
    ],
  },

  {
    id: "cronicas-do-abismo",
    slug: "cronicas-do-abismo",
    title: "Crônicas do Abismo",
    subtitle: "Em Preparação",
    description:
      "Um novo registro está sendo decifrado pelos Mestres da Ordem. Em breve será revelado aos dignos.",
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
    slug: "livro-negro-de-khem",
    title: "O Livro Negro de Khem",
    subtitle: "Em Preparação",
    description:
      "Oriundo das areias do antigo Egito, este registro promete revelar segredos há muito perdidos.",
    cover: "/images/doc-cover-3.jpg",
    category: "poder",
    requiredLevel: "ADEPTO",
    readTime: "???",
    released: false,
    preparingUntil: "2026-04-01T00:00:00",
    content: [],
  },
];

// =============================================
// HELPERS (pra ficar tudo claro no código)
// =============================================

// acha por slug OU id
export function getDocBySlugOrId(slugOrId: string) {
  return (
    DOCUMENTS.find((d) => d.slug === slugOrId) ||
    DOCUMENTS.find((d) => d.id === slugOrId) ||
    null
  );
}

// link que o catálogo deve usar
export function getDocHref(doc: Document) {
  return `/arquivos/${doc.slug ?? doc.id}`;
}

// qual “fonte” exibir no leitor
export function getDocSource(doc: Document) {
  if (doc.pdfUrl) return { type: "pdf" as const, value: doc.pdfUrl };
  return { type: "text" as const, value: doc.content ?? [] };
}

// =============================================
// UPDATES
// =============================================
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
];

// =============================================
// PLANS
// =============================================
export const PLANS: Plan[] = [
  {
    id: "iniciado",
    level: "INICIADO",
    name: "Ritual de Iniciação",
    description: "Torne-se um Iniciado e acesse os primeiros documentos classificados da Ordem.",
    price: "33,00",
    features: ["Acesso ao Codex Vermelho", "Central de Atualizações", "Marca de Iniciado no perfil", "Documentos de nível Iniciado"],
  },
  {
    id: "adepto",
    level: "ADEPTO",
    name: "Ascensão ao Adeptado",
    description: "Eleve-se ao nível Adepto. Documentos de alto grau serão revelados.",
    price: "66,00",
    features: ["Tudo do nível Iniciado", "Atlas dos Portais", "Documentos classificados", "Acesso antecipado a novos arquivos", "Marca de Adepto no perfil"],
  },
  {
    id: "conselho",
    level: "CONSELHO 33",
    name: "Conselho dos 33",
    description: "O nível supremo. Acesso total e irrestrito a todos os segredos da Ordem.",
    price: "99,00",
    features: ["Tudo do nível Adepto", "Protocolo 33", "Acesso vitalício", "Todos os documentos futuros", "Canal direto com a Ordem", "Marca do Conselho 33"],
  },
];

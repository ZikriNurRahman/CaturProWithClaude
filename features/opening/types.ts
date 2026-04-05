// Satu node/posisi dalam pohon pembukaan
export interface OpeningNode {
  id: string
  fen: string         // posisi papan dalam format FEN
  san: string         // langkah dalam notasi standar (e4, Nf3, dll)
  explanation: string // penjelasan dalam Bahasa Indonesia
  children: OpeningNode[] // variasi/langkah berikutnya
  parentId: string | null
}

// Satu kursus pembukaan
export interface Course {
  id: string
  title: string       // "Sicilian Defense"
  titleId: string     // "Pertahanan Sicilian"
  description: string
  difficulty: 'pemula' | 'menengah' | 'lanjut'
  isPremium: boolean
  eco: string         // kode ECO catur (B20, dll)
  nodes: OpeningNode[]
}

// Progress user per node
export interface NodeProgress {
  nodeId: string
  repetitions: number
  easeFactor: number
  interval: number
  nextReviewAt: string // simpan sebagai string ISO biar mudah di JSON
  lastReviewedAt: string
}
// features/opening/types.ts

// Satu posisi dalam pohon pembukaan
export interface OpeningNode {
  id: string
  fen: string              // Posisi papan dalam format FEN
  san: string              // Langkah dalam notasi standar (e4, Nf3)
  explanation: string      // Penjelasan Bahasa Indonesia
  children: OpeningNode[]  // Variasi berikutnya
  parentId: string | null
}

// Satu kursus pembukaan
export interface Course {
  id: string
  title: string            // "Sicilian Defense"
  titleId: string          // "Pertahanan Sicilian"
  description: string
  difficulty: 'pemula' | 'menengah' | 'lanjut'
  isPremium: boolean
  totalNodes: number
  authorName: string
  thumbnail: string
}

// Progress pengguna per posisi (untuk spaced repetition)
export interface UserProgress {
  userId: string
  nodeId: string
  repetitions: number      // Berapa kali sudah diulang
  easeFactor: number       // Faktor kemudahan SM-2 (default 2.5)
  interval: number         // Interval hari ke review berikutnya
  nextReviewAt: Date
  lastReviewedAt: Date
}
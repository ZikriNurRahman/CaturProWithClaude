import { Course } from '../types'

export const dummyCourses: Course[] = [
  {
    id: 'e4-opening',
    title: "King's Pawn Opening",
    titleId: 'Pembukaan Pion Raja',
    description: 'Pembukaan paling populer di dunia. Langkah pertama e4 langsung membuka diagonal untuk Menteri dan Gajah.',
    difficulty: 'pemula',
    isPremium: false,
    eco: 'C20',
    nodes: [
      {
        id: 'e4-1',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        san: 'e4',
        explanation: 'Langkah pertama terbaik! e4 membuka diagonal untuk Menteri dan Gajah, sekaligus merebut pusat papan.',
        parentId: null,
        children: [
          {
            id: 'e4-2',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            san: 'e5',
            explanation: 'Hitam membalas dengan e5 — sama-sama merebut pusat. Ini adalah respons paling klasik.',
            parentId: 'e4-1',
            children: [
              {
                id: 'e4-3',
                fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
                san: 'Nf3',
                explanation: 'Kuda ke f3 — menyerang pion e5 hitam sekaligus mengembangkan buah catur. Langkah terbaik!',
                parentId: 'e4-2',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sicilian',
    title: 'Sicilian Defense',
    titleId: 'Pertahanan Sicilian',
    description: 'Pertahanan paling populer melawan e4. Hitam tidak langsung membalas di pusat tapi membangun serangan di sayap menteri.',
    difficulty: 'menengah',
    isPremium: false,
    eco: 'B20',
    nodes: [
      {
        id: 'sic-1',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        san: 'e4',
        explanation: 'Putih membuka dengan e4.',
        parentId: null,
        children: [
          {
            id: 'sic-2',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            san: 'c5',
            explanation: 'Inilah Pertahanan Sicilian! c5 merebut pusat dari samping tanpa simetri.',
            parentId: 'sic-1',
            children: [],
          },
        ],
      },
    ],
  },
]
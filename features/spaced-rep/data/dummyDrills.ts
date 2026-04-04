import { DrillCard } from '../hooks/useSpacedRep'

export const dummyDrills: DrillCard[] = [
  {
    id: '1',
    question: 'Posisi FEN: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1\nApa langkah pembukaan terbaik?',
    answer: 'e4',
    srs: {
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
    },
    nextReviewAt: new Date('2000-01-01'), // tanggal sudah lewat
  },
  {
    id: '2',
    question: 'Posisi FEN: rnbqkbnr/pp1ppppp/2p5/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3\nApa langkah berikutnya?',
    answer: 'd4',
    srs: {
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
    },
    nextReviewAt: new Date('2000-01-01'),
  },
]
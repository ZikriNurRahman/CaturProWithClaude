import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'

// Type untuk satu langkah yang sudah dimainkan
export interface ChessMove {
  from: string
  to: string
  san: string        // notasi standar, contoh: "e4", "Nf3"
  promotion?: string // kalau pion promosi
}

// Type untuk status permainan
export type GameStatus =
  | 'playing'
  | 'check'
  | 'checkmate'
  | 'draw'
  | 'stalemate'

// Type untuk state yang dikembalikan hook
export interface ChessEngineState {
  fen: string              // posisi papan saat ini
  moves: ChessMove[]       // riwayat langkah
  status: GameStatus       // status permainan
  turn: 'w' | 'b'         // giliran siapa
  isGameOver: boolean
}

// Type untuk fungsi yang dikembalikan hook
export interface ChessEngineActions {
  makeMove: (from: string, to: string) => boolean
  undoMove: () => void
  resetGame: () => void
  loadPosition: (fen: string) => void
}

export function useChessEngine(): ChessEngineState & ChessEngineActions {
  const [game, setGame] = useState(new Chess())
  const [moves, setMoves] = useState<ChessMove[]>([])

  // Hitung status permainan
  const getStatus = useCallback((chess: Chess): GameStatus => {
    if (chess.isCheckmate()) return 'checkmate'
    if (chess.isStalemate()) return 'stalemate'
    if (chess.isDraw()) return 'draw'
    if (chess.isCheck()) return 'check'
    return 'playing'
  }, [])

  // Jalankan langkah
  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      // Kita perlu buat instance baru karena chess.js mutable
      const newGame = new Chess(game.fen())

      try {
        const result = newGame.move({
          from,
          to,
          promotion: 'q', // default promosi ke ratu
        })

        if (result) {
          setGame(newGame)
          setMoves(prev => [
            ...prev,
            {
              from: result.from,
              to: result.to,
              san: result.san,
              promotion: result.promotion,
            },
          ])
          return true // langkah berhasil
        }
      } catch {
        // Langkah tidak valid
      }

      return false // langkah gagal
    },
    [game]
  )

  // Batalkan langkah terakhir
  const undoMove = useCallback(() => {
    const newGame = new Chess(game.fen())
    newGame.undo()
    setGame(newGame)
    setMoves(prev => prev.slice(0, -1))
  }, [game])

  // Reset ke posisi awal
  const resetGame = useCallback(() => {
    setGame(new Chess())
    setMoves([])
  }, [])

  // Load posisi tertentu dari FEN
  const loadPosition = useCallback((fen: string) => {
    try {
      const newGame = new Chess(fen)
      setGame(newGame)
      setMoves([])
    } catch {
      console.warn('FEN tidak valid:', fen)
    }
  }, [])

  return {
    fen: game.fen(),
    moves,
    status: getStatus(game),
    turn: game.turn(),
    isGameOver: game.isGameOver(),
    makeMove,
    undoMove,
    resetGame,
    loadPosition,
  }
}
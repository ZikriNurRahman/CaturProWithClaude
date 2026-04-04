import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Chessboard from 'react-native-chessboard'
import { useChessEngine } from '../hooks/useChessEngine'

interface ChessboardMoveInfo {
  move: {
    from: string
    to: string
  }
  state: {
    fen: string
    in_promotion: boolean
  }
}

export function ChessBoard() {
  const { width, height } = useWindowDimensions()
  const boardSize = Math.min(width, height) * 0.85

  const {
    fen,
    moves,
    status,
    turn,
    makeMove,
    undoMove,
    resetGame,
  } = useChessEngine()

  const getStatusMessage = () => {
    switch (status) {
      case 'checkmate':
        return `Skak Mat! ${turn === 'w' ? 'Hitam' : 'Putih'} menang! 🏆`
      case 'stalemate':
        return 'Remis — Stalemate! 🤝'
      case 'draw':
        return 'Remis! 🤝'
      case 'check':
        return `Skak! ${turn === 'w' ? 'Putih' : 'Hitam'} dalam bahaya ⚠️`
      default:
        return `Giliran ${turn === 'w' ? 'Putih ♙' : 'Hitam ♟'}`
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Status permainan dengan background gelap dan padding */}
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{getStatusMessage()}</Text>
      </View>

      {/* Papan catur */}
      <Chessboard
        fen={fen}
        boardSize={boardSize}
        onMove={(info: ChessboardMoveInfo) => {
          if (info.move) {
            makeMove(info.move.from, info.move.to)
          }
        }}
      />

      {/* Riwayat langkah dengan background */}
      {moves.length > 0 && (
        <View style={styles.historyBox}>
          <Text style={styles.historyLabel}>Riwayat Langkah:</Text>
          <Text style={styles.historyMoves}>{moves.map(m => m.san).join(' · ')}</Text>
        </View>
      )}

      {/* Tombol aksi */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={undoMove}
          disabled={moves.length === 0}
          style={[
            styles.button,
            moves.length === 0 ? styles.buttonDisabled : styles.buttonBlue,
          ]}
        >
          <Text style={styles.buttonText}>↩ Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetGame} style={[styles.button, styles.buttonGray]}>
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  statusBox: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    width: '90%',
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  historyBox: {
    marginTop: 16,
    width: '90%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  historyLabel: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 6,
  },
  historyMoves: {
    color: 'white',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonBlue: {
    backgroundColor: '#2563eb',
  },
  buttonGray: {
    backgroundColor: '#334155',
  },
  buttonDisabled: {
    backgroundColor: '#1e293b',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
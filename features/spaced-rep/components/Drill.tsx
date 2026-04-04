import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSpacedRep, DrillCard } from '../hooks/useSpacedRep'

export function Drill() {
  const { dueCards, updateCard, loading } = useSpacedRep()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (dueCards.length === 0) {
      setCurrentIndex(0)
      setShowAnswer(false)
    }
  }, [dueCards])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Memuat latihan...</Text>
      </View>
    )
  }

  if (dueCards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tidak ada latihan hari ini. Selamat beristirahat! 😊</Text>
      </View>
    )
  }

  const card = dueCards[currentIndex]

  function handleAnswer(quality: 0 | 1 | 2 | 3 | 4 | 5) {
    updateCard(card.id, quality)
    setShowAnswer(false)
    setCurrentIndex(prev => (prev + 1) % dueCards.length)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{card.question}</Text>
      {showAnswer && <Text style={styles.answer}>Jawaban: {card.answer}</Text>}

      {!showAnswer && (
        <TouchableOpacity style={styles.button} onPress={() => setShowAnswer(true)}>
          <Text style={styles.buttonText}>Tampilkan Jawaban</Text>
        </TouchableOpacity>
      )}

      {showAnswer && (
        <View style={styles.buttonsRow}>
          {[5, 4, 3, 2, 1, 0].map(quality => (
            <TouchableOpacity
              key={quality}
              style={[styles.button, quality >= 3 ? styles.good : styles.bad]}
              onPress={() => handleAnswer(quality as 0 | 1 | 2 | 3 | 4 | 5)}
            >
              <Text style={styles.buttonText}>{quality}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  question: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  answer: {
    color: '#34d399',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  good: {
    backgroundColor: '#34d399',
    marginHorizontal: 5,
  },
  bad: {
    backgroundColor: '#ef4444',
    marginHorizontal: 5,
  },
})
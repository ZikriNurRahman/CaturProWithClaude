import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { calculateNextReview, Quality, SRSData } from '../algorithm'
import { dummyDrills } from '../data/dummyDrills'

export interface DrillCard {
  id: string   
  question: string
  answer: string
  srs: SRSData
  nextReviewAt: Date
}

const STORAGE_KEY = 'caturpro_spaced_rep'

export function useSpacedRep() {
  const [cards, setCards] = useState<DrillCard[]>([])
  const [loading, setLoading] = useState(true)

  // Load data dari AsyncStorage
  useEffect(() => {
    async function load() {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        if (data) {
          const parsed: DrillCard[] = JSON.parse(data)
          setCards(parsed)
        } else {
          // Isi dengan data dummy drill kalau belum ada
          setCards(dummyDrills)
        }
      } catch {
        setCards(dummyDrills)
      } finally {
        setLoading(false)
      }
    }
    load()
}, [])

  // Simpan data ke AsyncStorage kalau cards berubah
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    }
  }, [cards, loading])

  // Fungsi untuk update hasil drill berdasarkan kualitas jawaban
  function updateCard(id: string, quality: Quality) {
    setCards(current =>
      current.map(card => {
        if (card.id !== id) return card
        const updated = calculateNextReview(card.srs, quality)
        return {
          ...card,
          srs: {
            easeFactor: updated.easeFactor,
            interval: updated.interval,
            repetitions: updated.repetitions,
          },
          nextReviewAt: updated.nextReviewDate,
        }
      })
    )
  }

  // Filter kartu yang jatuh tempo review hari ini atau lebih awal
  const dueCards = cards.filter(card => new Date(card.nextReviewAt) <= new Date())

  return {
    cards,
    setCards,
    dueCards,
    loading,
    updateCard,
  }
}
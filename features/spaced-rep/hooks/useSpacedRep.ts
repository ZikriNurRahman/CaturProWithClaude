import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { calculateNextReview, Quality, SRSData } from '../algorithm'
import { dummyDrills } from '../data/dummyDrills'

export interface DrillCard {
  id: string      // id unik puzzle/latihan
  question: string
  answer: string
  srs: SRSData
  nextReviewAt: Date
}

const STORAGE_KEY = 'caturpro_spaced_rep'

// Initial default SRS data
const defaultSRS: SRSData = {
  easeFactor: 2.5,
  interval: 1,
  repetitions: 0,
}

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
          console.log('Loaded drill cards:', data ? JSON.parse(data) : dummyDrills)
          setCards(parsed)
        } else {
          // Isi dengan data dummy drill kalau belum ada
          console.log('Loaded drill cards:', data ? JSON.parse(data) : dummyDrills)
          setCards(dummyDrills)
        }
      } catch (error) {
        console.warn(error)
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
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards)).catch(console.warn)
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
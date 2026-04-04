// features/spaced-rep/algorithm.ts

export interface SRSData {
  easeFactor: number  // default 2.5
  interval: number    // dalam hari
  repetitions: number // jumlah pengulangan sukses berturut-turut
}

export type Quality = 0 | 1 | 2 | 3 | 4 | 5
// 0 = Blackout (tidak ingat sama sekali)
// 5 = Sangat mudah

/**
 * Hitung jadwal review dengan algoritma SM-2
 * @param data state SRS saat ini
 * @param quality kualitas jawaban user 0-5
 * @returns data SRS yang sudah diupdate plus tanggal review berikutnya
 */
export function calculateNextReview(
  data: SRSData,
  quality: Quality
): SRSData & { nextReviewDate: Date } {
  let { easeFactor, interval, repetitions } = data

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  } else {
    repetitions = 0
    interval = 1
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate,
  }
}
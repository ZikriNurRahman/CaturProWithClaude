// features/opening/schemas.ts
import { z } from 'zod'

export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  titleId: z.string().min(1),
  description: z.string(),
  difficulty: z.enum(['pemula', 'menengah', 'lanjut']),
  isPremium: z.boolean(),
  totalNodes: z.number().int().positive(),
  authorName: z.string(),
  thumbnail: z.string(),
})

export const UserProgressSchema = z.object({
  userId: z.string(),
  nodeId: z.string(),
  repetitions: z.number().int().min(0),
  easeFactor: z.number().min(1.3),
  interval: z.number().int().positive(),
  nextReviewAt: z.coerce.date(),
  lastReviewedAt: z.coerce.date(),
})

// Type otomatis dari schema — tidak perlu tulis 2 kali
export type Course = z.infer<typeof CourseSchema>
export type UserProgress = z.infer<typeof UserProgressSchema>
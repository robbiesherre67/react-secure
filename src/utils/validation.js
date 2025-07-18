// src/utils/validation.js
import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' }),

  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
})

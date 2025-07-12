import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(3, 'Must be at least 3 characters'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

import { z } from 'zod';

export const signInFormSchema = z.object({
    username: z.string().min(3).max(16),
    password: z.string().min(8).max(255),
});

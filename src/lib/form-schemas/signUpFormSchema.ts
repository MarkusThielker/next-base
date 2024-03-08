import { z } from 'zod';

export const signUpFormSchema = z.object({
    username: z.string().min(3).max(16),
    password: z.string().min(8).max(255),
    confirm: z.string().min(8).max(255),
}).refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
});

import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(4, 'Please enter valid username or email'),
  password: z.string().min(6, { message: 'Please enter valid password' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

import { z } from 'zod';

export const CredentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type CredentialSchema = z.infer<typeof CredentialSchema>;

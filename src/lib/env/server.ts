import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    // Next Auth
    NEXTAUTH_SECRET: z.string(),

    // Node
    NODE_ENV: z.enum(['development', 'production', 'test']),

    // OAuth Github
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    // Next Auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    // Node
    NODE_ENV: process.env.NODE_ENV,

    // OAuth Github
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
  },
});

import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.number(),
});

export const env = envSchema.parse({
  ...process.env,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
});

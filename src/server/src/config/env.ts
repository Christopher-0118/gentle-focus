import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
});

const requiredEnv = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
};

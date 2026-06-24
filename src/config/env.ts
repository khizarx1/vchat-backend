/**
 * Validated environment configuration.
 *
 * We parse `process.env` through a zod schema ONCE, at startup. If a required
 * variable is missing or malformed the app fails loudly here — instead of
 * crashing mysteriously deep in a request handler. Everywhere else imports the
 * typed `env` object, never `process.env` directly.
 */
import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

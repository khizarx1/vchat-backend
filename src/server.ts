/**
 * Server bootstrap — the entry point (`npm run dev`).
 *
 * Connects to the database first (so a bad connection fails fast and loudly),
 * starts the HTTP server, and wires graceful shutdown so Postgres connections
 * are released cleanly on Ctrl+C / container stop.
 */
import { env } from './config/env';
import { createApp } from './app';
import { prisma } from './lib/prisma';

async function main() {
  await prisma.$connect();
  console.log('✅ Database connected');

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 API running at http://localhost:${env.PORT}/api`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received — shutting down...`);
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

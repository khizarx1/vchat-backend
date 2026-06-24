/**
 * A single shared PrismaClient for the whole process.
 *
 * Creating a new PrismaClient opens a connection pool, so we want exactly ONE.
 * In development `tsx watch` reloads the module on every save; stashing the
 * client on `globalThis` means a reload reuses the existing instance instead of
 * leaking a fresh pool each time.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

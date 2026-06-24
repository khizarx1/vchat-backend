// Health service — verifies the database connection.
import { prisma } from '../../lib/prisma';

export const healthService = {
  async check() {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', database: 'up' };
  },
};

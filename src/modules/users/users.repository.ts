// Users repository — all Prisma access for the User table.
import { prisma } from '../../lib/prisma';

const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  about: true,
  phone: true,
  avatarUrl: true,
  lastSeenAt: true,
  createdAt: true,
} as const;

export const usersRepository = {
  findMany() {
    return prisma.user.findMany({
      select: publicUserSelect,
      orderBy: { createdAt: 'desc' },
    });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });
  },

  create(data: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({
      data,
      select: publicUserSelect,
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },

  findByEmailWithHash(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });
  },
};

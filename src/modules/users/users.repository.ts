// Users repository — all Prisma access for the User table.
import { prisma } from '../../lib/prisma';

const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  about: true,
  phone: true,
  avatarUri: true,
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
};

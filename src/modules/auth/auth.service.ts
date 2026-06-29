// Auth service — registration, login, and access/refresh token lifecycle.
import { env } from '../../config/env';
import { HttpError } from '../../lib/http-error';
import { signAccessToken } from '../../lib/jwt';
import { hashPassword, verifyPassword } from '../../lib/password';
import { generateRefreshToken, hashToken } from '../../lib/tokens';
import { usersRepository } from '../users/users.repository';
import { authRepository } from './auth.repository';
import type { LoginInput, RegisterInput } from './auth.validation';

function refreshExpiry(): Date {
  return new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
}

async function issueTokens(userId: string) {
  const accessToken = signAccessToken(userId);
  const refreshToken = generateRefreshToken();
  await authRepository.createRefreshToken({
    userId,
    tokenHash: hashToken(refreshToken),
    expiresAt: refreshExpiry(),
  });
  return { accessToken, refreshToken };
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await usersRepository.findByEmail(input.email);
    if (existing) throw new HttpError(409, 'Email already in use');

    const passwordHash = await hashPassword(input.password);
    const user = await usersRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return { user, ...(await issueTokens(user.id)) };
  },

  async login(input: LoginInput) {
    const credentials = await usersRepository.findByEmailWithHash(input.email);
    if (!credentials || !(await verifyPassword(input.password, credentials.passwordHash))) {
      throw new HttpError(401, 'Invalid email or password');
    }

    const user = await usersRepository.findById(credentials.id);
    return { user, ...(await issueTokens(credentials.id)) };
  },

  async refresh(refreshToken: string) {
    const stored = await authRepository.findValidByHash(hashToken(refreshToken));
    if (!stored) throw new HttpError(401, 'Invalid or expired refresh token');

    await authRepository.revokeById(stored.id);
    return issueTokens(stored.userId);
  },

  async logout(refreshToken: string) {
    await authRepository.revokeByHash(hashToken(refreshToken));
  },

  async me(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) throw new HttpError(404, 'User not found');
    return user;
  },
};

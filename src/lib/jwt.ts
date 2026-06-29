/**
 * Access-token signing/verification.
 *
 * The token is a stateless JWT whose `sub` claim is the user id. We keep it
 * short-lived (env: JWT_ACCESS_EXPIRES_IN) because, unlike refresh tokens, it
 * can't be revoked server-side — a short window limits the damage if it leaks.
 */
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type AccessTokenPayload = { sub: string };

export function signAccessToken(userId: string): string {
  const options = { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as SignOptions;
  return jwt.sign({ sub: userId }, env.JWT_SECRET, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
}

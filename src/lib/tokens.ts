/**
 * Refresh-token helpers.
 *
 * The refresh token is a high-entropy random string we hand to the client; we
 * store only its SHA-256 hash, so a database leak can't reveal usable tokens.
 * SHA-256 (not bcrypt) is fine here because the input is already random — there's
 * nothing to brute-force.
 */
import { createHash, randomBytes } from 'crypto';

export function generateRefreshToken(): string {
  return randomBytes(48).toString('hex');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

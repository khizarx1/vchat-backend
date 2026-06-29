/**
 * Password hashing with bcrypt. The cost factor controls how slow (and thus how
 * brute-force-resistant) hashing is; 12 is a sensible default in 2026.
 */
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

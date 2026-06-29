/**
 * Protects routes: requires a valid `Authorization: Bearer <accessToken>`.
 *
 * On success it attaches `req.user = { id }` so handlers know who is calling.
 * On any failure it forwards a 401 HttpError to the central error handler.
 */
import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../lib/jwt';
import { HttpError } from '../lib/http-error';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Missing or malformed Authorization header'));
  }

  try {
    const payload = verifyAccessToken(header.slice(7));
    req.user = { id: payload.sub };
    next();
  } catch {
    next(new HttpError(401, 'Invalid or expired token'));
  }
}

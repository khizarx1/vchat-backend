/**
 * Catches any request that didn't match a route and returns a clean 404 JSON
 * body (instead of Express's default HTML page).
 */
import type { Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

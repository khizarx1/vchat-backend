/**
 * The central error handler — Express recognises it by its FOUR arguments.
 *
 * Any error thrown in a route/service (or passed to `next(err)`) lands here, so
 * each handler stays focused on the happy path. We translate known error shapes
 * (zod validation, Prisma) into proper status codes and never leak a stack trace
 * to the client.
 */
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'ValidationError',
      issues: err.issues,
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Something went wrong.',
  });
}

/**
 * Request validation. Pass zod schemas for whichever request parts you want
 * checked; parsed (and coerced) values are written back onto the request. A
 * failure throws a ZodError, which the central error handler formats as a 400.
 */
import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

type Schemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) Object.assign(req.query, schemas.query.parse(req.query));
      next();
    } catch (err) {
      next(err);
    }
  };
}

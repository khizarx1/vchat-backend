// Health controller.
import type { NextFunction, Request, Response } from 'express';
import { healthService } from './health.service';

export const healthController = {
  async check(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await healthService.check());
    } catch (err) {
      next(err);
    }
  },
};

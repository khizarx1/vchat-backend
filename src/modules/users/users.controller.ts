// Users controller.
import type { NextFunction, Request, Response } from 'express';
import { usersService } from './users.service';

export const usersController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await usersService.findAll());
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'NotFound', message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};

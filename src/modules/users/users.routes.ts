// Users routes — mounted at /users.
import { Router } from 'express';
import { usersController } from './users.controller';

export const usersRoutes = Router();

usersRoutes.get('/', usersController.list);
usersRoutes.get('/:id', usersController.getOne);

/**
 * The API router — one place that mounts every feature module under its prefix.
 * Adding a module is a two-line change here, keeping app.ts clean.
 */
import { Router } from 'express';
import { healthRoutes } from './modules/health/health.routes';
import { usersRoutes } from './modules/users/users.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/users', usersRoutes);

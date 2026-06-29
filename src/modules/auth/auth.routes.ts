// Auth routes — mounted at /auth.
import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import { validate } from '../../middlewares/validate';
import { authController } from './auth.controller';
import { loginSchema, refreshSchema, registerSchema } from './auth.validation';

export const authRoutes = Router();

authRoutes.post('/register', validate({ body: registerSchema }), authController.register);
authRoutes.post('/login', validate({ body: loginSchema }), authController.login);
authRoutes.post('/refresh', validate({ body: refreshSchema }), authController.refresh);
authRoutes.post('/logout', validate({ body: refreshSchema }), authController.logout);
authRoutes.get('/me', authenticate, authController.me);

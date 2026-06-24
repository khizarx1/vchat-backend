/**
 * Express application assembly.
 *
 * Order matters: global middleware first, then the API routes, then the
 * not-found handler, and finally the error handler (which must be LAST so it can
 * catch errors from everything above it).
 */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error-handler';
import { notFound } from './middlewares/not-found';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();

  app.use(helmet()); // sensible security headers
  app.use(cors()); // allow the mobile app / browser to call us
  app.use(express.json()); // parse JSON request bodies
  app.use(morgan('dev')); // concise request logging

  // Everything lives under /api so the API has a clear namespace.
  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

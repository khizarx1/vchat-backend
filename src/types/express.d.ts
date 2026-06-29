/**
 * Augments Express's Request so `req.user` is available and typed after the
 * `authenticate` middleware runs. Ambient declaration — no imports/exports.
 */
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export {};

/**
 * An error carrying an HTTP status code. Throw it from services/middleware
 * (e.g. `throw new HttpError(409, 'Email already in use')`) and the central
 * error handler turns it into that exact response — no status logic in controllers.
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

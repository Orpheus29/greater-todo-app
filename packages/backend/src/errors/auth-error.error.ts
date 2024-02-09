import { HttpStatus } from '../types/http-status.type';
import { HttpError } from './http-error.error';

export class AuthError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

import { HttpStatus } from '../types/http-status.type';
import { HttpError } from './http-error.error';

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

import { HttpStatus } from '../types/http-status.type';
import { HttpError } from './http-error.error';

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

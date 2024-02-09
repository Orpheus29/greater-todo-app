import { HttpStatus } from '../types/http-status.type';
import { HttpError } from './http-error.error';

export class Internal extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

import { HttpStatus } from '../types/http-status.type';

export class HttpError extends Error {
  constructor(message: string, public httpStatus: HttpStatus) {
    super(message);
  }
}

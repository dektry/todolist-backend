import { HttpStatus } from '../enums/httpStatus.enum';

export class HttpException extends Error {
  private readonly httpCode: HttpStatus;
  readonly name: string;

  constructor(status, message) {
    super();
    this.httpCode = status;
    this.name = message;
  }
}

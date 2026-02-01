import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  public code: string;
  constructor(error: unknown) {
    super('Validation failed', 400, { cause: error });
    this.code = 'VALIDATION_FAILED';
  }
}

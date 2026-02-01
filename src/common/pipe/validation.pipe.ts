import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '@/common/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    const input = value ?? {};

    if (!metatype || !this.toValidate(metatype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const object = plainToInstance(metatype, input);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const errors = await validate(object, { whitelist: true });
    if (errors.length > 0) {
      // set error
      const validationError = errors.map((e) => ({
        field: e.property,
        error:
          typeof e.constraints == 'object' ? Object.values(e.constraints) : [],
      }));

      throw new ValidationException(validationError);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return object;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

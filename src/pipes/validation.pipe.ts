import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipes implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const msg = errors.map(
        (err) =>
          `${err.property}: ${Object.values(err.constraints).join(', ')}`,
      );

      throw new ValidationException(msg);
    }

    return value;
  }
}

import { PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from '../utils/mongodb.utils';

export class MongoIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseSuccess<T> {
  message: string | null;
  data: T;
}

interface IResponse {
  message: string | null;
  data: unknown;
}

@Injectable()
export class ResponseSuceessForamt<T> implements NestInterceptor<
  T,
  ResponseSuccess<T>
> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: IResponse) => {
        return {
          success: true,
          message: response.message,
          data: response.data,
        };
      }),
    );
  }
}

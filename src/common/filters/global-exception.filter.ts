import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalException');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    // handle httpexceptions
    if (exception instanceof HttpException) {
      this.handleHttpException(exception, host);
    }
    //  handle other errors
    else {
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      console.log(exception);
      // log the exception
      this.logger.error(`${exception as string}`);

      const responseBody = {
        success: false,
        statusCode: httpStatus,
        message: 'Internal server error',
      };

      this.sendResponse(responseBody, httpStatus, host);
    }
  }

  private handleHttpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const httpStatus = exception.getStatus();
    const message = exception.message;
    const errors = exception.cause;

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      path: request.url,
      message,
      ...(errors !== undefined && { errors }),
    };

    this.sendResponse(responseBody, httpStatus, host);
  }

  private sendResponse(
    responseBody: unknown,
    httpStatus: number,
    host: ArgumentsHost,
  ) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

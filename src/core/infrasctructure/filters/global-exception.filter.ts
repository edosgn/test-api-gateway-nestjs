import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    Logger.error(exception);

    const context = host.switchToHttp();
    const response = context.getResponse();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Unknown Error';

    let data: any = {
      statusCode,
      message,
    };

    if (exception instanceof Error) {
      data.message = exception.message;
    }

    if (exception instanceof HttpException) {
      const response: any = exception.getResponse();
      data.statusCode = exception.getStatus();
      data.message = `${response.error ? `${response.error}: ` : ''}${
        response.message
      }`;
    }

    if (
      exception.response &&
      exception instanceof HttpException === false &&
      exception instanceof Error === false
    ) {
      data = exception.response;
    }

    Logger.error(`Status ${data.statusCode} Error: ${JSON.stringify(data)}`);

    response.status(data.statusCode).json(data);
  }
}

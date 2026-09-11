import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { MysqlErrorCode } from '../enums/mysql-error.enum.js';
import { ErrorMessages } from '../constants/error-messages.js';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const driverError = (exception as any).driverError;

    if (driverError?.code === MysqlErrorCode.DUPLICATE_ENTRY) {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: ErrorMessages.DUPLICATE_UNIQUE,
      });
    }

    // не дублікат — лишаємо як 500
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Internal server error',
    });
  }
}

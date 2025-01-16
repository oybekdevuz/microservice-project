import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { RpcException } from '@nestjs/microservices';
  import { Observable, throwError } from 'rxjs';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Observable<any> {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status: number;
      let message: string;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const responseObj = exception.getResponse();
  
        if (typeof responseObj === 'string') {
          message = responseObj;
        } else if (typeof responseObj === 'object' && 'message' in responseObj) {
          message =  "An error occurred while processing";
        } else {
          message = 'An error occurred';
        }
      } else if (exception instanceof RpcException) {
        const error = exception.getError();
        if (isRpcExceptionResponse(error)) {
          status = error.status;
          message = error.message;
        } else {
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Internal server error';
        }
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
      }
  
      if (status !== HttpStatus.BAD_REQUEST && status !== HttpStatus.NOT_FOUND) {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
      }
  
      console.error({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request?.url,
      });
  
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request?.url,
      });
  
      return throwError(() => ({
        statusCode: status,
        message,
      }));
    }
  }
  
  function isRpcExceptionResponse(error: any): error is { status: number; message: string } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error &&
      typeof error.status === 'number' &&
      typeof error.message === 'string'
    );
  }
  
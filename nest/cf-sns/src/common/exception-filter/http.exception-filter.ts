import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 잡고 싶은 예외를 전달
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // ArgumentHost는 ExecutionContext의 슈퍼 클래스
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toLocaleString('kr'),
      path: req.url,
    });
  }
}

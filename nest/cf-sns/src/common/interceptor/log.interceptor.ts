import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    /**
     * 요청이 들어올 때 REQ 요청이 들어온 타임스태프를 찍는다.
     * [REQ] {요청 path} {요청 시간간
     *
     * 요청이 끝날 때 (응답이 나갈 때) 다시 타임스태프를 찍는다.
     * [RES] {요청 path} {응답 시간} {소요 시간간
     */

    const req = context.switchToHttp().getRequest();

    // /posts
    // /common/image
    const path = req.originalUrl;

    const now = new Date();

    //[REQ] {요청 path} {요청 시간간
    console.log(`[REQ] ${path} ${now.toLocaleString('kr')}`);

    // return next.handle()을 실행하는 순간
    // 라우트의 로직이 전부 실행되고 응답이 반환된다.
    // observable로
    return next.handle().pipe(
      // observable은  response임
      //   tap((observable) => console.log(observable)),
      // 공통응답 처리하기 좋겠다
      //   map((observable) => {
      // return {
      //   response: observable,
      // };
      //   }),
      tap((observable) => {
        console.log(
          `[RES] ${path} ${new Date().toLocaleString('kr')} ${
            new Date().getMilliseconds() - now.getMilliseconds()
          }`,
        );
      }),
    );
  }
}

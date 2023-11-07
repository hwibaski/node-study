import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const QueryRunner = createParamDecorator((context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  if (!req.quernRunner) {
    throw new InternalServerErrorException(
      'QueryRunner 데코레이터를 사용하려면 트랜잭션 인터셉터를 적용해야 합니다.',
    );
  }

  return req.quernRunner;
});

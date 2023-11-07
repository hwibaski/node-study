import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // PaginationPostDto의 기본값(order_createdAt = 'ASC')을 넣어서 컨트롤러에 자동으로 넣어주도록 설정
      transform: true,
      // @IsNumber()를 붙히면 string을 number로 변환시켜줌
      // @Type(() => Number)를 명시적으로 붙히지 않아도된다.
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

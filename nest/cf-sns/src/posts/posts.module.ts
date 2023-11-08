import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './entity/posts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { ImageModel } from 'src/common/entity/image.entity';
import { PostImagesService } from './image/images.service';
import { LogMiddleware } from 'src/common/middleware/log.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostModel, ImageModel]),
    AuthModule,
    UsersModule,
    CommonModule,
  ],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostImagesService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.ALL });
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Student, Teacher } from './entity/person.entity';
import {
  AirplaneModel,
  BookModel,
  CarModel,
  ComputerModel,
  SingleBaseModel,
} from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hwibaski',
      password: 'hwibaski',
      database: 'typeorm_study',
      entities: [
        UserModel,
        Student,
        Teacher,
        BookModel,
        CarModel,
        SingleBaseModel,
        ComputerModel,
        AirplaneModel,
        ProfileModel,
        PostModel,
        TagModel,
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

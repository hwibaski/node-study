import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModel } from './entity/chat.entity';
import { CommonModule } from 'src/common/common.module';
import { ChatsMessagesService } from './messages/messages.service';
import { MessageModel } from './messages/entity/messages.entity';
import { MessagesController } from './messages/messages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModel } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsModel, MessageModel]),
    CommonModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsGateway, ChatsService, ChatsMessagesService],
})
export class ChatsModule {}

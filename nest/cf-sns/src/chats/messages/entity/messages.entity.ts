import { IsString } from 'class-validator';
import { ChatsModel } from 'src/chats/entity/chat.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { UserModel } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class MessageModel extends BaseModel {
  @ManyToOne(() => ChatsModel, (chat) => chat.messages)
  chat: ChatsModel;

  @ManyToOne(() => UserModel, (user) => user.messages)
  author: UserModel;

  @Column()
  @IsString()
  message: string;
}

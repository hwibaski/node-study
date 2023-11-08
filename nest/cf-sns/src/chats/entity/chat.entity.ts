import { BaseModel } from 'src/common/entity/base.entity';
import { UserModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { MessageModel } from '../messages/entity/messages.entity';
import { IsString } from 'class-validator';

@Entity()
export class ChatsModel extends BaseModel {
  @ManyToMany(() => UserModel, (user) => user.chats)
  users: UserModel[];

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages: MessageModel[];
}

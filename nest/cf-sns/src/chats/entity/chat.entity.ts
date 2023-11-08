import { BaseModel } from 'src/common/entity/base.entity';
import { UserModel } from 'src/users/entity/users.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { MessageModel } from '../messages/entity/messages.entity';

@Entity()
export class ChatsModel extends BaseModel {
  @ManyToMany(() => UserModel, (user) => user.chats)
  users: UserModel[];

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages: MessageModel[];
}

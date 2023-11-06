import { BaseModel } from 'src/common/entity/base.entity';
import { UserModel } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostModel extends BaseModel {
  // 1) FK를 이용해서 UserModel과 연동
  // 2) null이 될 수 없다.
  @ManyToOne(() => UserModel, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  author: UserModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}

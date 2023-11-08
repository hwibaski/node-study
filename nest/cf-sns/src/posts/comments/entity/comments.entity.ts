import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../common/entity/base.entity';
import { UserModel } from '../../../users/entity/users.entity';
import { PostModel } from '../../entity/posts.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class CommentsModel extends BaseModel {
  @ManyToOne(() => UserModel, (user) => user.postComments)
  author: UserModel;

  @ManyToOne(() => PostModel, (post) => post.comments)
  post: PostModel;

  @Column()
  @IsString()
  comment: string;

  @Column({
    default: 0,
  })
  @IsNumber()
  likeCount: number;
}

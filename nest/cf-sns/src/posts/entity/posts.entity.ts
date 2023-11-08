import { BaseModel } from 'src/common/entity/base.entity';
import { ImageModel } from 'src/common/entity/image.entity';
import { UserModel } from 'src/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentsModel } from '../comments/entity/comments.entity';

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

  // @Column({
  //   nullable: true,
  // })
  // @Transform(({ value }) => value && `/${join(POST_PUBLIC_IMAGE_PATH, value)}`)
  // image?: string;

  @OneToMany(() => ImageModel, (image) => image.post)
  images: ImageModel[];

  @OneToMany(() => CommentsModel, (comment) => comment.author)
  comments: CommentsModel[];
}

import { Transform } from 'class-transformer';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { ImageModel } from 'src/common/entity/image.entity';
import { UserModel } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  // @Column({
  //   nullable: true,
  // })
  // @Transform(({ value }) => value && `/${join(POST_PUBLIC_IMAGE_PATH, value)}`)
  // image?: string;

  @OneToMany(() => ImageModel, (image) => image.post)
  images: ImageModel[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column({ unique: true })
  // 1) unique
  email: string;

  @Column({ length: 20, unique: true })
  // 1) 길이 20을 넘지 않을 것
  // 2) unique
  nickname: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}

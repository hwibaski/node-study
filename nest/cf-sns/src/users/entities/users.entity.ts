import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
// @Exclude(), 모든 프로퍼티를 노출하지 않는다. 원하는 프로퍼티만 @Expose 달아주면 그 프로퍼티만 노출
export class UserModel extends BaseModel {
  @Column({ unique: true })
  // 1) unique
  email: string;

  @Column({ length: 20, unique: true })
  // 1) 길이 20을 넘지 않을 것
  // 2) unique
  nickname: string;

  /**
   * 마찬가지로 entity에 붙히는 것은 적절하지 않아보인다.
   */
  @Expose()
  get nicknameAndEmail() {
    return this.nickname + '/' + this.email;
  }

  @Column()
  /**
   * frontent -> backend 상황 (Request)
   * plain object (JSON) -> class instance (dto)
   *
   *
   * backend -> frontend 상황 (Response)
   * class instance (dto) -> plain object(JSON)
   *
   * toClassOnly : class instance로 변환될 때만 -> 요청일 때만 적용
   * toPlainOnly : plain object로 변환될 때만 -> 응답일 때만 적용
   *
   * 아무것도 입력하지 않을 시 요청, 응답 모두 적용
   *
   * 지금은 Entity에 붙혔지만 DTO에 있는게 좋겠다
   */
  @Exclude({ toPlainOnly: true })
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

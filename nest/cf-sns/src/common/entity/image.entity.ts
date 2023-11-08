import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { Transform } from 'class-transformer';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from '../const/path.const';
import { PostModel } from 'src/posts/entity/posts.entity';

export enum ImageModelType {
  POST_IMAGE = 'POST_IMAGE',
}

@Entity()
export class ImageModel extends BaseModel {
  // 이미지 업로드 순서
  @Column({
    default: 0,
  })
  order?: number = 0;

  // UserModel -> 사용자 프로필 이미지
  // PostModel -> 포스트 이미지
  @Column({
    enum: ImageModelType,
  })
  type: ImageModelType;

  @Column()
  @Transform(({ value, obj }) => {
    // obj는 지금 이 클래스의 인스턴스를 가리킨다.
    if (obj.type === ImageModelType.POST_IMAGE) {
      return join(POST_PUBLIC_IMAGE_PATH, value);
    } else {
      return value;
    }
  })
  path: string;

  @ManyToOne(() => PostModel, (post) => post.images, { nullable: true })
  post?: PostModel;
}

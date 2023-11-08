import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { ImageModelType } from 'src/common/entity/image.entity';
import { PostModel } from 'src/posts/entity/posts.entity';

export class CreatePostImageDto {
  // 이미지 업로드 순서
  @IsInt()
  @IsOptional()
  order?: number = 0;

  // UserModel -> 사용자 프로필 이미지
  // PostModel -> 포스트 이미지
  @IsEnum(ImageModelType)
  @IsString()
  type: ImageModelType;

  @IsString()
  @Transform(({ value, obj }) => {
    // obj는 지금 이 클래스의 인스턴스를 가리킨다.
    if (obj.type === ImageModelType.POST_IMAGE) {
      return join(POST_PUBLIC_IMAGE_PATH, value);
    } else {
      return value;
    }
  })
  path: string;

  post?: PostModel;
}

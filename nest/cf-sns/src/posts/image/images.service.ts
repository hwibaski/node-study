import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageModel } from 'src/common/entity/image.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreatePostImageDto } from './dto/create-image.dto';
import { promises } from 'fs';
import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from 'src/common/const/path.const';
import { basename, join } from 'path';

@Injectable()
export class PostImagesService {
  constructor(
    @InjectRepository(ImageModel)
    private readonly imageRepository: Repository<ImageModel>,
  ) {}

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ImageModel>(ImageModel)
      : this.imageRepository;
  }

  async createPostImage(dto: CreatePostImageDto, qr?: QueryRunner) {
    // dto의 이미지 이름을 기반으로
    // 파일의 경로를 생성한다.

    const repository = this.getRepository(qr);

    const tempFilePath = join(TEMP_FOLDER_PATH, dto.path);

    try {
      // 파일이 존재하는지 확인
      // 만약에 존재하지 않으면 예외를 던짐
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일입니다.');
    }

    // 파일의 이름만 가져오기
    // /Users/aaa/bbb/asdf.jpg -> asdf.jpg
    const fileName = basename(tempFilePath);

    // 새로 이동할 포스트 폴더의 경로 + 이미지 이름
    const newPath = join(POST_IMAGE_PATH, fileName);

    // save image
    const result = await repository.save({
      ...dto,
    });

    await promises.rename(tempFilePath, newPath);

    return result;
  }
}

import { BadRequestException, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from 'src/common/const/path.const';
import { v4 as uuid } from 'uuid';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MulterModule.register({
      limits: {
        // byte 단위
        fileSize: 10000000,
      },
      fileFilter: (req, file, cb) => {
        /**
         * cb(에러, boolean)
         *
         * 첫번째 파라미터에는 에러가 있을 경우 에러 정보를 넣어준다
         * 두번째 파라미터는 파일을 받을 지 말지 boolean을 넣어준다.
         */
        // xxx.jpg -> .jpg
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return cb(new BadRequestException('jpg/jpeg/png 만 가능'), false);
        }

        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination(req, file, callback) {
          callback(null, TEMP_FOLDER_PATH);
        },
        filename(req, file, callback) {
          callback(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}

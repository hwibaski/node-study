import { PickType } from '@nestjs/mapped-types';
import { PostModel } from '../entities/posts.entity';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class UpdatePostDto {
  @IsString({ message: stringValidationMessage })
  @IsOptional()
  title?: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  content?: string;
}

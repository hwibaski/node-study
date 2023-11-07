import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PostModel } from '../entities/posts.entity';

export const DEFAULT_POST_FIND_OPTIONS: FindManyOptions<PostModel> = {
  relations: {
    author: true,
    images: true,
  },
};

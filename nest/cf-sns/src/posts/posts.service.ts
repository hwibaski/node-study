import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  LessThan,
  MoreThan,
  QueryRunner,
  Repository,
} from 'typeorm';
import { PostModel } from './entity/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationPostDto } from './dto/paginate-post.dto';
import { CommonService } from 'src/common/common.service';
import { ConfigService } from '@nestjs/config';
import {
  ENV_HOST_KEY,
  ENV_PROTOCOL_KEY,
} from 'src/common/const/env-keys.const';
import { ImageModel } from 'src/common/entity/image.entity';
import { DEFAULT_POST_FIND_OPTIONS } from './const/default-post-find-options.const';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    @InjectRepository(ImageModel)
    private readonly imageRepository: Repository<ImageModel>,
  ) {}
  async getAllPosts() {
    return await this.postRepository.find({
      ...DEFAULT_POST_FIND_OPTIONS,
    });
  }

  async paginationPosts(dto: PaginationPostDto) {
    return this.commonService.paginate(
      dto,
      this.postRepository,
      {
        ...DEFAULT_POST_FIND_OPTIONS,
      },
      'post',
    );
    // if (dto.page) {
    //   return this.pagePaginatePosts(dto);
    // } else {
    //   return this.cursorPaginatePosts(dto);
    // }
  }

  async pagePaginatePosts(dto: PaginationPostDto) {
    /**
     *  data: Data[]
     * total: number
     */

    const [posts, count] = await this.postRepository.findAndCount({
      skip: dto.take * dto.page,
      take: dto.take,
      order: {
        createdAt: dto.order__createdAt,
      },
    });

    return {
      data: posts,
      total: count,
    };
  }

  async cursorPaginatePosts(dto: PaginationPostDto) {
    const where: FindOptionsWhere<PostModel> = {};

    if (dto.where__id__less_than) {
      where.id = LessThan(dto.where__id__less_than);
    } else if (dto.where__id__more_than) {
      where.id = MoreThan(dto.where__id__more_than);
    }

    const posts = await this.postRepository.find({
      where: {
        id: MoreThan(dto.where__id__more_than ?? 0),
      },
      // order__createdAT
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });

    /**
     * 해당되는 포스트가 0개 이상이면
     * 마지막 포스트를 가져오고
     * 아니면 null을 반환한다.
     */
    const lastItem =
      posts.length > 0 && posts.length === dto.take
        ? posts[posts.length - 1]
        : null;

    const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
    const host = this.configService.get<string>(ENV_HOST_KEY);
    const nextUrl = lastItem && new URL(`${protocol}://${host}/posts`);

    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 밸류가 존재하면
       * param에 그대로 붙여넣는다.
       *
       * 단 where__id__more_than 값만 lastItem의 마지막 값으로 넣어준다
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      }

      let key = null;

      if (dto.order__createdAt === 'ASC') {
        key = 'where_id__more_than';
      } else {
        key = 'where_id__less_than';
      }

      nextUrl.searchParams.append(key, lastItem.id.toString());
    }

    /**
     * Response
     *
     * data: Data[]
     * cursor: {
     *  after: 마지막 Data의 ID
     * }
     * count: 응답한 데이터의 갯수
     * next: 다음 요청을 할 때 사용할 URL
     */

    return {
      data: posts,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: posts.length,
      next: nextUrl?.toString() ?? null,
    };
  }

  async generatePosts(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `임의로 생성된 포스트 ${i}`,
        content: `임의로 생성된 포스트 내용 ${i}`,
        images: [],
      });
    }
  }

  async getPostById(id: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const post = await repository.findOne({
      ...DEFAULT_POST_FIND_OPTIONS,
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<PostModel>(PostModel)
      : this.postRepository;
  }

  async createPost(authorId: number, postDto: CreatePostDto, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const post = repository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      images: [],
      likeCount: 0,
      commentCount: 0,
    });

    return await repository.save(post);
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    // save의 기능
    // 1) 새로 생성
    // 2) id가 존재하는 데이터가 있으면 다른 컬럼을 update 한다.

    const { title, content } = postDto;

    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    return await this.postRepository.save(post);
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.delete(postId);

    return postId;
  }

  async checkPostExistsById(id: number) {
    return this.postRepository.exist({
      where: { id },
    });
  }
}

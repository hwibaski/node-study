import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { privateDecrypt } from 'crypto';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,

    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // 객체 생성자랑 역할
    const user1 = this.userRepository.create({
      title: 'hwbaski',
    });

    // 생성 및 저장
    const user2 = this.userRepository.save({
      title: 'hwbaski',
    });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음 *** (find + create)
    const user3 = this.userRepository.preload({
      id: 101,
      title: 'atdstasdt',
    });

    // 삭제하기
    await this.userRepository.delete(101);

    // increment, decrement도 있음
    await this.userRepository.increment(
      {
        id: 1,
      },
      'count',
      2,
    );

    // 갯수 카운팅하기
    const count = await this.userRepository.count({
      where: {
        title: Like('%123%'),
      },
    });

    // 합계
    const sum = await this.userRepository.sum('count', {
      title: ILike('%0%'),
    });

    // average
    const avg = await this.userRepository.average('count', {
      id: LessThan(4),
    });

    // min
    const min = await this.userRepository.minimum('count', {
      id: LessThan(4),
    });

    // max
    const max = await this.userRepository.maximum('count', {
      id: LessThan(4),
    });
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        title: `test title - ${i}`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 필드를 가지고 올지 선택, 기본은 모든 프로퍼티
      // select를 정의하면 정의된 프로퍼티들만 가져온다.
      select: {
        profile: {
          id: true,
        },
        title: true,
      },
      where: {
        // id가 1이 아닌 경우
        // id: Not(1),
        // 적은 경우
        // id: LessThan(30),
        // 작거나 같은 경우
        // id: LessThanOrEqual(30),
        // id: MoreThan(30),
        // id: MoreThanOrEqual(30)
        // id: Equal(30)
        // title: Like('%google'),
        // title: ILike('%google')
        // id: Between(10, 15),
        // id: In([1, 2, 3]),
        id: IsNull(),
      },
      // where 내의 조건들은 모두 and 조건으로 묶인다.
      // where: {
      //   version: 1,
      //   id: 3,
      // },
      // or
      // where: [{ id: 3 }, { version: 1 }],
      relations: {
        profile: true,
        posts: true,
      },
      order: {
        id: 'ASC',
      },

      // offset
      skip: 1,
      take: 1,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      title: user.title + 0,
    });
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      title: 'title',
      profile: {
        profileImage: 'asdf.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImage: 'asdf',
    //   user,
    // });

    return user;
  }

  @Post('users/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      title: 'hwibaski',
    });

    await this.postRepository.save({
      title: 'post1',
      author: user,
    });

    await this.postRepository.save({
      title: 'post2',
      author: user,
    });
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post = await this.postRepository.save({
      title: 'Nest Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Program Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'JavaScript',
      posts: [post, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post, post2],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(parseInt(id));
  }
}

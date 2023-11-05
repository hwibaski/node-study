import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjenas_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 11241240,
    commentCount: 9999,
  },
  {
    id: 2,
    author: 'newjenas_official',
    title: '뉴진스 해린',
    content: '노래 연습하고 있는 해린',
    likeCount: 124124,
    commentCount: 1241249,
  },
  {
    id: 3,
    author: 'newjenas_official',
    title: '블랙핑크 로제',
    content: '공연하고 있는 로제',
    likeCount: 123123123,
    commentCount: 9999,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}
  async getAllPosts() {
    return await this.postRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    return await this.postRepository.save(post);
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save의 기능
    // 1) 새로 생성
    // 2) id가 존재하는 데이터가 있으면 다른 컬럼을 update 한다.

    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
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
}

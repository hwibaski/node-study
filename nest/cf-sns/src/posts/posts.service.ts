import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}
  async getAllPosts() {
    return await this.postRepository.find({
      relations: { author: true },
    });
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    const post = this.postRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    return await this.postRepository.save(post);
  }

  async updatePost(postId: number, title: string, content: string) {
    // save의 기능
    // 1) 새로 생성
    // 2) id가 존재하는 데이터가 있으면 다른 컬럼을 update 한다.

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
}

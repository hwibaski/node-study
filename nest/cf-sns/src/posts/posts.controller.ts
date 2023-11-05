import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return posts;
  }

  /**
   * 모든 param은 string으로 넘어온다
   */
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts.push(post);

    return post;
  }

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((p) => p.id === parseInt(id));

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

    posts = posts.map((prevPost) =>
      prevPost.id === parseInt(id) ? post : prevPost,
    );

    return posts;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((p) => p.id !== parseInt(id));

    return id;
  }
}

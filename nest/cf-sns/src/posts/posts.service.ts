import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
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

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((p) => p.id === id);

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((p) => p.id === postId);

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

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return posts;
  }

  deletePost(postId: number) {
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((p) => p.id !== postId);

    return postId;
  }
}

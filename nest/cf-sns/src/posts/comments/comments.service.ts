import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { PaginateCommentsDto } from './dto/paginate-comments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsModel } from './entity/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UserModel } from '../../users/entity/users.entity';
import { UpdateCommentsDto } from './dto/update-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(CommentsModel)
    private readonly commentsRepository: Repository<CommentsModel>,
  ) {}

  paginateComments(dto: PaginateCommentsDto, postId: number) {
    return this.commonService.paginate(
      dto,
      this.commentsRepository,
      {
        where: {
          id: postId,
        },
      },
      `posts/${postId}/comments`,
    );
  }

  async getCommentById(id: number) {
    const comment = this.commentsRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new BadRequestException(`${id} 의 코멘트가 존재하지 않습니다.`);
    }

    return comment;
  }

  async createComment(
    dto: CreateCommentsDto,
    postId: number,
    author: UserModel,
  ) {
    return this.commentsRepository.save({
      ...dto,
      post: {
        id: postId,
      },
      author,
    });
  }

  async updateComment(dto: UpdateCommentsDto, commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    const prevComment = await this.commentsRepository.preload({
      id: commentId,
      ...dto,
    });

    return await this.commentsRepository.save(prevComment);
  }

  async deleteComment(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    return this.commentsRepository.delete(id);
  }
}

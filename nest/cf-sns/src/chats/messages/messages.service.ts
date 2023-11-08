import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageModel } from './entity/messages.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatsMessagesService {
  constructor(
    @InjectRepository(MessageModel)
    private readonly messageRepository: Repository<MessageModel>,
    private readonly commonService: CommonService,
  ) {}

  async createMessage(dto: CreateMessageDto, authorId: number) {
    const message = await this.messageRepository.save({
      chat: {
        id: dto.chatId,
      },
      author: {
        id: authorId,
      },
      message: dto.message,
    });

    return this.messageRepository.findOne({
      where: {
        id: message.id,
      },
      relations: {
        chat: true,
      },
    });
  }

  paginateMessages(
    dto: BasePaginationDto,
    overrideFindOptions: FindManyOptions<MessageModel>,
  ) {
    return this.commonService.paginate(
      dto,
      this.messageRepository,
      overrideFindOptions,
      'messages',
    );
  }
}

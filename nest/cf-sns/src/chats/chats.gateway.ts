import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsService } from './chats.service';
import { EnterChatDto } from './dto/enter-chat.dto';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ChatsMessagesService } from './messages/messages.service';
import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SocketChatHttpExceptionFilter } from 'src/common/exception-filter/socket-catch-http.exception-filter';
import { UserModel } from 'src/users/entities/users.entity';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  // /chats
  namespace: 'chats',
})
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: ChatsMessagesService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): any {
    console.log(`after gateway init`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`on disconnect called : ${client.id}`);
  }

  @UseGuards(AccessTokenGuard)
  async handleConnection(socket: Socket & { user: UserModel }) {
    console.log(`on connect called : ${socket.id}`);

    const header = socket.handshake.headers;

    // Bearer xxxx
    const rawToken = header['authorization'];

    if (!rawToken) {
      socket.disconnect();
      throw new WsException('토큰이 없습니다');
    }

    // try 안의 코드들은 http 예외를 던지고 있기 때문에 웹소켓 예외로 변환
    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);
      const payload = await this.authService.verifyToken(token);
      socket.user = await this.userService.getUserByEmail(payload.email);
    } catch (e) {
      socket.disconnect();
      // throw new WsException('토큰이 유효하지 않습니다.');
    }
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseFilters(SocketChatHttpExceptionFilter)
  @SubscribeMessage('enter_chat')
  async enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket & { user: UserModel },
  ) {
    console.log(data);
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);

      if (!exists) {
        // 예외가 아니라 클라이언트 측에서 exception이라는 이벤트로 응답한다.
        throw new WsException({
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
        });
      }
    }

    socket.join(data.chatIds.map((x) => x.toString()));
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseFilters(SocketChatHttpExceptionFilter)
  // socket.on('send_message_event', (msg) => {console.log(msg)})
  // 'send_message_event' 를 서버에서 구독하고 있다.
  @SubscribeMessage('send_message_event')
  async sendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() socket: Socket & { user: UserModel },
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`,
      );
    }

    const message = await this.messageService.createMessage(
      dto,
      socket.user.id,
    );

    // 'receiver_message' 이벤트를 구독하고 있는 클라이언트에게 메세지를 보낸다.
    // this.server.emit('receive_message', 'hello from server');

    // 동일한 chatId에 연결되어 있는 클라이언트에게만(자기 자신 포함) 메세지 보함
    // this.server.in(msg.chatId.toString()).emit('receive_message', msg.message);

    // this.server를 쓰면 사용자를 구분하지 않고 모두에게
    // socket은 연결된 소켓들에게

    socket.to(message.chat.id.toString()).emit('receive_message', dto.message);
  }

  // gateway에는 rest API처럼 main.ts에 글로벌하게 적용할 수 없음
  // gateway마다 적용해야함
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseFilters(SocketChatHttpExceptionFilter)
  // rest api로 챗방 만들어도 되지만 공부 차원에서 socket 사용
  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket & { user: UserModel },
  ) {
    await this.chatsService.createChat(data);
  }
}

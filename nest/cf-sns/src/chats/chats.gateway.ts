import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
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

@WebSocketGateway({
  // /chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: ChatsMessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage('enter_chat')
  async enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket,
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

  // socket.on('send_message_event', (msg) => {console.log(msg)})
  // 'send_message_event' 를 서버에서 구독하고 있다.
  @SubscribeMessage('send_message_event')
  async sendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`,
      );
    }

    const message = await this.messageService.createMessage(dto);

    // 'receiver_message' 이벤트를 구독하고 있는 클라이언트에게 메세지를 보낸다.
    // this.server.emit('receive_message', 'hello from server');

    // 동일한 chatId에 연결되어 있는 클라이언트에게만(자기 자신 포함) 메세지 보함
    // this.server.in(msg.chatId.toString()).emit('receive_message', msg.message);

    // this.server를 쓰면 사용자를 구분하지 않고 모두에게
    // socket은 연결된 소켓들에게

    socket.to(message.chat.id.toString()).emit('receive_message', dto.message);
  }

  // rest api로 챗방 만들어도 되지만 공부 차원에서 socket 사용
  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.createChat(data);
  }
}

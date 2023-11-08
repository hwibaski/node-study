import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SocketBearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient();

    const header = socket.handshake.headers;

    // Bearer xxxx
    const rawToken = header['authorization'];

    if (!rawToken) {
      throw new WsException('토큰이 없습니다');
    }

    // try 안의 코드들은 http 예외를 던지고 있기 때문에 웹소켓 예외로 변환
    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);
      const payload = await this.authService.verifyToken(token);
      const user = await this.userService.getUserByEmail(payload.email);

      socket.user = user;
      socket.token = token;
      socket.tokenType = payload.tokenType;
    } catch (e) {
      throw new WsException('토큰이 유효하지 않습니다.');
    }

    return true;
  }
}

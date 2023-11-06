/**
 * 구현할 기능
 *
 * 1) 요청객체 (request)를 불러오고
 *    authorization header로부터 토큰을 가져온다.
 *
 * 2) authService.extractTokenFromHeader를 이용해서
 *    사용할 수 있는 형태의 토큰을 추출한다.
 *
 * 3) authSerivce.decodeBasicToken()를 실행해서
 *    email과 password를 추출한다.
 *
 * 4) email과 password를 이용해서 사용자를 가져온다.
 *    authService.authenticateWithEmailAndPassword
 *
 * 5) 찾아낸 사용자를 (1) 요청 객체에 붙혀준다.
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('token invalid');
    }

    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const result = await this.authService.verifyToken(token);

    /**
     * 1) 사용자 정보 - user
     * 2) token - token
     * 3) tokenType - access | refresh
     */
    const user = await this.userService.getUserByEmail(result.email);

    req.user = user;
    req.token = token;
    req.tokenType = result.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();
    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();
    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }

    return true;
  }
}

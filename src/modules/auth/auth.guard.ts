import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { isValidObjectId } from '@/common/utils/mongodb.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException('Unauthorized');

    let userId: string | null;
    // validate token
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const jwtPaylaod = (await this.jwtService.verifyAsync(token)) as {
        id?: string;
      };

      if (isValidObjectId(jwtPaylaod?.id)) userId = String(jwtPaylaod.id);
      else throw new UnauthorizedException('Unauthorized');
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    // check user in db
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // set user
    request.user = user;

    return true;
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];

    if (!authHeader) return null;

    const token = authHeader.split(' ');

    if (token.length !== 2) return null;

    return token[1];
  }
}

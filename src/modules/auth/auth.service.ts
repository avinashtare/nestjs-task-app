import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { comparePassword, passwordToHash } from '@/common/utils/password.utils';
import { JwtService } from '@nestjs/jwt';
import { jwtExpire } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerice: UserService,
    private jwtService: JwtService,
  ) {}
  async register(data: RegisterDto): Promise<{ accessToken: string }> {
    const isUserExists = await this.userSerice.getUserByEmail(data.email);

    // check user already exits
    if (isUserExists) {
      throw new ConflictException('User already exists', {
        cause: { email: data.email },
      });
    }

    // password hash
    const hashPassword = await passwordToHash(data.password);
    if (!hashPassword) {
      throw new Error('Unable to hash password');
    }

    // create user
    const newUser = await this.userSerice.createUser({
      email: data.email,
      name: data.name,
      password: hashPassword,
    });

    // create access token
    const accessToken = await this.jwtService.signAsync(
      { id: newUser.id },
      { expiresIn: jwtExpire.register },
    );

    return { accessToken };
  }
  async login(data: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userSerice.getUserByEmail(data.email);

    // if user not exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // create access token
    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: jwtExpire.login },
    );

    return { accessToken };
  }
}

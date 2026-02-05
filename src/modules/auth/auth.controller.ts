import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { ValidationPipe } from '@/common/pipe/validation.pipe';
import { AuthService } from './auth.service';
import { ResponseSuccess } from '@/common/inspectors/ResponseSuceessForamt.inspector';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe()) registerData: RegisterDto,
  ): Promise<ResponseSuccess<{ accessToken: string }>> {
    const response = await this.AuthService.register(registerData);

    return { message: 'user register successfully', data: response };
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginData: LoginDto,
  ): Promise<ResponseSuccess<{ accessToken: string }>> {
    const response = await this.AuthService.login(loginData);

    return { message: 'user login successfully', data: response };
  }
}

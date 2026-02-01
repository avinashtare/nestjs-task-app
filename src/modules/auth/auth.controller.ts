import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { ValidationPipe } from '@/common/pipe/validation.pipe';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body(new ValidationPipe()) registerData: RegisterDto): any {
    return this.AuthService.register(registerData);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) loginData: LoginDto): any {
    return this.AuthService.login(loginData);
  }
}

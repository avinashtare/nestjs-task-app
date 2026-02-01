import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import envConfig from '@/common/config/env.config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: envConfig.JWT_SECRET,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

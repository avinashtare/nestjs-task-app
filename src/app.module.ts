import { Module } from '@nestjs/common';
import { AppController } from './modules/home/app.controller';
import { AppService } from './modules/home/app.service';
import { ApiModule } from '@/api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      this.logger.log('Connecting to database...');
      await this.$connect();
      this.logger.log('Database connected successfully');
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        this.logger.error(error.message);
      } else {
        this.logger.error('Failed to connect to database', error);
      }
    }
  }
}

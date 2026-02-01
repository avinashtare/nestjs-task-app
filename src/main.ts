import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { GlobalExceptionsFilter } from './common/filters/global-exception.filter';
import envConfig from './common/config/env.config';
import { Logger } from '@nestjs/common';

const PORT = envConfig.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global exception filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapterHost));

  await app.listen(PORT ?? 3000, () =>
    Logger.log('Server Running on http://localhost:' + PORT),
  );
}
bootstrap();

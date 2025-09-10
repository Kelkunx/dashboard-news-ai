import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://dashboard-news-ai.vercel.app', // URL du frontend
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

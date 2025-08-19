import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NewsModule, SummaryModule],
})
export class AppModule {}

import { Controller, Get, Query } from '@nestjs/common';
import { NewsService, NewsArticle } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(
    @Query('category') category?: string,
    @Query('country') country?: string,
    @Query('language') language?: string,
  ): Promise<NewsArticle[]> {
    return await this.newsService.getLatestNews(category, country, language);
  }
}

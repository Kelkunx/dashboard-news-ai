import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(
    @Query('category') category: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('q') q?: string,
  ) {
    const p = parseInt(page, 10) || 1;
    const pp = parseInt(perPage, 10) || 5;
    return this.newsService.getNews(category, p, pp, q);
  }
}

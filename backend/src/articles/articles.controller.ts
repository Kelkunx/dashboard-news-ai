import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    const { title, content } = body;
    if (!title || !content) {
      return { message: 'Title and content are required' };
    }
    return this.articlesService.create(title, content);
  }
}

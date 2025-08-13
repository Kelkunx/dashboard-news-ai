import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; content: string }): Promise<Article> {
    return this.articlesService.create(body.title, body.content);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title?: string; content?: string },
  ): Promise<Article> {
    return this.articlesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.articlesService.remove(id);
  }
}

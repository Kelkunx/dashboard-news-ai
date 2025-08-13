import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepo: Repository<Article>, // Repository pour accéder aux données
  ) {}

  // Récupérer tous les articles
  findAll(): Promise<Article[]> {
    return this.articlesRepo.find();
  }

  // Créer un nouvel article
  create(title: string, content: string): Promise<Article> {
    const article = this.articlesRepo.create({ title, content }); // crée un objet
    return this.articlesRepo.save(article); // sauvegarde dans la DB
  }

  async update(
    id: number,
    body: { title?: string; content?: string },
  ): Promise<Article> {
    const article = await this.articlesRepo.findOneBy({ id });
    if (!article) throw new Error('Article non trouvé');

    article.title = body.title ?? article.title;
    article.content = body.content ?? article.content;

    return this.articlesRepo.save(article);
  }

  async remove(id: number): Promise<void> {
    await this.articlesRepo.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Type de DB
      database: 'db.sqlite', // Fichier SQLite
      entities: [Article], // Entités à gérer
      synchronize: true, // Crée automatiquement les tables
    }),
    ArticlesModule,
  ],
})
export class AppModule {}

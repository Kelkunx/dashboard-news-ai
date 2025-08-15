import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

export interface NewsArticle {
  title: string;
  description?: string;
  link?: string;
  [key: string]: any;
}

@Injectable()
export class NewsService {
  private readonly baseUrl = 'https://newsdata.io/api/1/news';

  async getLatestNews(
    category?: string,
    country?: string,
    language?: string,
  ): Promise<NewsArticle[]> {
    try {
      const response = await axios.get<{ results?: NewsArticle[] }>(
        this.baseUrl,
        {
          params: {
            apikey: process.env.NEWSDATA_API_KEY,
            category,
            country,
            language,
          },
        },
      );

      return response.data.results || []; // retourne uniquement les articles disponibles
    } catch {
      throw new HttpException('Erreur lors de la récupération des news', 500);
    }
  }
}

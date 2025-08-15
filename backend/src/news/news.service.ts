import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  private readonly baseUrl = 'https://newsdata.io/api/1/news';

  async getLatestNews(category?: string, country?: string, language?: string) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: process.env.NEWSDATA_API_KEY,
          category,
          country,
          language,
        },
      });

      return response.data.results || []; // retourne uniquement les articles disponibles
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des news', 500);
    }
  }
}

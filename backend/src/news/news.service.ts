import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

export interface NewsItem {
  title?: string;
  description?: string;
  link?: string;
  pubDate?: string;
  content?: string; // contenu complet pour l'IA
  url?: string;
}

@Injectable()
export class NewsService {
  private parser = new Parser();
  private cache: Record<string, { timestamp: number; items: NewsItem[] }> = {};

  // flux RSS simples avec contenu complet
  private feeds: Record<string, string[]> = {
    technology: [
      'https://www.technologyreview.com/feed/',
      'https://feeds.arstechnica.com/arstechnica/technology-lab',
    ],
    business: ['https://www.businessinsider.com/rss'],
    sports: ['https://www.espn.com/espn/rss/news'],
  };

  async getNews(
    category: string,
    page = 1,
    perPage = 5,
    q?: string,
  ): Promise<NewsItem[]> {
    const now = Date.now();
    const cacheKey = category;

    // Si cache < 5 min, on renvoie directement
    if (
      this.cache[cacheKey] &&
      now - this.cache[cacheKey].timestamp < 5 * 60 * 1000
    ) {
      return this.paginate(this.cache[cacheKey].items, page, perPage, q);
    }

    const feeds = this.feeds[category] || this.feeds['technology'];
    const items: Parser.Item[] = [];

    for (const feed of feeds) {
      try {
        const rss = await this.parser.parseURL(feed);
        items.push(...(rss.items ?? []));
      } catch (err) {
        console.error('Erreur parsing flux RSS', feed, err);
      }
    }

    // On garde uniquement ce qu’on veut pour l’IA
    const newsItems: NewsItem[] = items.map((item) => ({
      title: item.title,
      description: item.contentSnippet || item.title,
      content: item.content || item.contentSnippet || item.title,
      link: item.link,
      url: item.link,
      pubDate: item.pubDate,
    }));

    // On met en cache
    this.cache[cacheKey] = { timestamp: now, items: newsItems };

    return this.paginate(newsItems, page, perPage, q);
  }

  private paginate(
    items: NewsItem[],
    page: number,
    perPage: number,
    q?: string,
  ) {
    if (q) {
      const keyword = q.toLowerCase();
      items = items.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(keyword)) ||
          (item.content && item.content.toLowerCase().includes(keyword)),
      );
    }
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  }
}

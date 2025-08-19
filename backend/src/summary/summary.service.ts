// summary.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SummaryService {
  private readonly logger = new Logger(SummaryService.name);

  constructor(private readonly http: HttpService) {}

  /**
   * Génère un résumé IA pour un texte donné
   * @param text Texte à résumer
   * @returns Résumé (IA ou fallback)
   */
  async summarize(text: string): Promise<string> {
    const textToSummarize = text?.trim();
    if (!textToSummarize) return 'Résumé indisponible';

    try {
      const response$ = this.http.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        { inputs: textToSummarize.slice(0, 1000) },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const response = await firstValueFrom(response$);
      const data = response?.data as { summary_text: string }[] | undefined;

      if (data && data[0]?.summary_text) return data[0].summary_text;

      this.logger.warn('No content from HuggingFace, using fallback');
      return this.fallbackSummary(textToSummarize);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`Erreur API HuggingFace: ${error.message}`);
      return this.fallbackSummary(textToSummarize);
    }
  }

  /**
   * Fallback simple : prend les 2 premières phrases
   * @param text Texte à résumer
   * @returns Résumé naïf
   */
  private fallbackSummary(text: string): string {
    const sentences = text.split('.');
    return (
      sentences.slice(0, 2).join('.') + (sentences.length > 2 ? '...' : '')
    );
  }
}

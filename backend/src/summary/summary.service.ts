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
        { inputs: textToSummarize },
        { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } },
      );

      type HuggingFaceSummary = { summary_text: string };
      type HuggingFaceResponse = HuggingFaceSummary[];

      const response = await firstValueFrom(response$);

      // Vérifie que l'API a renvoyé un résumé
      const data = response?.data as HuggingFaceResponse | undefined;
      if (data && data[0]?.summary_text) {
        return data[0].summary_text;
      } else {
        this.logger.warn('No content from HuggingFace, using fallback');
        return this.fallbackSummary(textToSummarize);
      }
    } catch {
      this.logger.error('Erreur API HuggingFace');
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

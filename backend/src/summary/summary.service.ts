import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SummaryService {
  private readonly logger = new Logger(SummaryService.name);

  constructor(private readonly http: HttpService) {}

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
      const data = response?.data as HuggingFaceResponse | undefined;

      if (data && data[0]?.summary_text?.length > 50) {
        return data[0].summary_text;
      } else {
        this.logger.warn('Résumé trop court ou vide, fallback utilisé');
        return this.fallbackSummary(textToSummarize);
      }
    } catch (err) {
      this.logger.error('Erreur API HuggingFace', err);
      return this.fallbackSummary(textToSummarize);
    }
  }

  private fallbackSummary(text: string): string {
    const sentences = text.split('.');
    return (
      sentences.slice(0, 4).join('.') + (sentences.length > 4 ? '...' : '')
    );
  }
}

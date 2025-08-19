import { Controller, Post, Body } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async summarize(@Body('text') text: string) {
    const summary = await this.summaryService.summarize(text);
    return { summary };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { HttpModule } from '@nestjs/axios';

describe('SummaryService', () => {
  let service: SummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SummaryService],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
  });

  it('should return a summary string', async () => {
    const summary = await service.summarize('This is a test text.');
    expect(typeof summary).toBe('string');
  });
});

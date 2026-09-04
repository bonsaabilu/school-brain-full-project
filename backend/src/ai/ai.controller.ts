import { Controller, Post, Param } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('evaluate-student/:id')
  evaluateStudentRisk(@Param('id') id: string) {
    return this.aiService.evaluateStudentRisk(id);
  }
}

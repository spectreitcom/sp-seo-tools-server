import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAnalysisCommand } from '../commands/create-analysis.command';

@Injectable()
export class AnalysisService {
  constructor(private readonly commandBus: CommandBus) {}

  async createAnalysis(userId: string, payload: CreateAnalysisDto) {
    return this.commandBus.execute<CreateAnalysisCommand, void>(
      new CreateAnalysisCommand(
        userId,
        payload.keyword,
        payload.localizationId,
        payload.device,
      ),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { AnalysisRepository } from '../../application/ports/analysis.repository';
import { DatabaseService } from '../../../database/database.service';
import { Analysis } from '../../domain/analysis';

// todo;

@Injectable()
export class PrismaAnalysisRepository implements AnalysisRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(analysis: Analysis): Promise<void> {
    return Promise.resolve(undefined);
  }

  findById(analysisId: string): Promise<Analysis> {
    return Promise.resolve(undefined);
  }

  exceededMonthlyLimit(userId: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}

import { UserAnalysisReadModel as UserAnalysisReadModelBase } from '../../infrastructure/read-models/user-analysis.read-model';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class UserAnalysisReadModel implements UserAnalysisReadModelBase {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly analysisId: string;

  @ApiProperty({
    example: randomUUID(),
  })
  readonly userId: string;

  @ApiProperty({
    example: 'Tablet',
  })
  readonly deviceName: string;

  @ApiProperty({
    example: 67,
    description: 'Progress in percent',
  })
  readonly progress: number;

  @ApiProperty({
    example: 'Poland',
  })
  readonly localizationName: string;

  @ApiProperty({
    example: 'pl',
  })
  readonly localizationCountryCode: string;

  @ApiProperty({
    example: 'the best software house in Cracow',
  })
  readonly phrase: string;
}

import { GetUserAnalysisListQueryResponse as GetAnalysisListQueryResponseBase } from '../query-handlers/get-user-analysis-list.query-handler';
import { UserAnalysisReadModelSwagger } from './user-analysis-read-model.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserAnalysisListResponseSwagger
  implements GetAnalysisListQueryResponseBase
{
  @ApiProperty({
    type: UserAnalysisReadModelSwagger,
    isArray: true,
  })
  readonly data: UserAnalysisReadModelSwagger[];

  @ApiProperty({
    example: 100,
  })
  readonly userTotal: number;

  @ApiProperty({
    example: 76,
  })
  readonly total: number;
}

import { GetUserAnalysisListQueryResponse as GetAnalysisListQueryResponseBase } from '../query-handlers/get-user-analysis-list.query-handler';
import { UserAnalysisReadModel } from '../query-handlers/user-analysis-read-model';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserAnalysisListResponse
  implements GetAnalysisListQueryResponseBase
{
  @ApiProperty({
    type: UserAnalysisReadModel,
    isArray: true,
  })
  readonly data: UserAnalysisReadModel[];

  @ApiProperty({
    example: 100,
  })
  readonly userTotal: number;

  @ApiProperty({
    example: 76,
  })
  readonly total: number;
}

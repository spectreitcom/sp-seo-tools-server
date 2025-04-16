import { ApiProperty } from '@nestjs/swagger';
import { DomainPositionHistoryDto } from './domain-position-history.dto';
import { GetKeywordPositionHistoryQueryResponse } from '../query-handlers/get-domain-position-history.query-handler';

export class GetKeywordPositionHistoryQueryResponseSwagger
  implements GetKeywordPositionHistoryQueryResponse
{
  @ApiProperty({
    type: DomainPositionHistoryDto,
    isArray: true,
  })
  readonly data: DomainPositionHistoryDto[];

  @ApiProperty({
    example: 10,
  })
  readonly total: number;
  @ApiProperty({
    example: 20,
  })
  readonly userTotal: number;
}

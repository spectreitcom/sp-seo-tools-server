import { ApiProperty } from '@nestjs/swagger';
import { UserKeywordsListItemDto } from './user-keywords-list-item.dto';
import { GetUserKeywordsListQueryResponse } from '../query-handlers/get-user-keywords-list.query-handler';

export class GetUserKeywordsListQueryResponseSwagger
  implements GetUserKeywordsListQueryResponse
{
  @ApiProperty({
    isArray: true,
    type: UserKeywordsListItemDto,
  })
  readonly data: UserKeywordsListItemDto[];

  @ApiProperty({
    example: 10,
  })
  readonly total: number;
  @ApiProperty({
    example: 20,
  })
  readonly userTotal: number;
}

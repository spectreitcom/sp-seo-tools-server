import { ApiProperty } from '@nestjs/swagger';
import { UserKeywordsListItemDto } from './user-keywords-list-item.dto';

export class GetUserKeywordsListQueryResponse {
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

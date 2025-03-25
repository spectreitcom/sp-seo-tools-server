import { ApiProperty } from '@nestjs/swagger';
import { UserDomainsListItemDto } from './user-domains-list-item.dto';

export class GetUserDomainsListQueryResponse {
  @ApiProperty({
    isArray: true,
    type: UserDomainsListItemDto,
  })
  readonly data: UserDomainsListItemDto[];
  @ApiProperty({
    example: 10,
  })
  readonly total: number;
  @ApiProperty({
    example: 20,
  })
  readonly userTotal: number;
}

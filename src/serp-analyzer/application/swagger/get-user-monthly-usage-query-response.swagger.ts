import { GetUserMonthlyUsageQueryResponse } from '../query-handlers/get-user-monthly-usage.query-handler';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserMonthlyUsageQueryResponseSwagger
  implements GetUserMonthlyUsageQueryResponse
{
  @ApiProperty({
    example: 100,
  })
  readonly monthlyLimit: number;

  @ApiProperty({
    example: 5,
  })
  readonly usedQuota: number;
}

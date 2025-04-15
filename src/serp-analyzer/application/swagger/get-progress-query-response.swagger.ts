import { GetProgressQueryResponse } from '../query-handlers/get-progress.query-handler';
import { ApiProperty } from '@nestjs/swagger';

export class GetProgressQueryResponseSwagger
  implements GetProgressQueryResponse
{
  @ApiProperty({
    example: 56,
  })
  readonly progress: number;
}

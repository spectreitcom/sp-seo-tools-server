import { ApiProperty } from '@nestjs/swagger';
import { AvailableKeywordsQuantityDto } from '../dto/available-keywords-quantity.dto';

export class AvailableKeywordsQuantityDtoSwagger
  implements AvailableKeywordsQuantityDto
{
  @ApiProperty({
    description: 'The total number of available keywords quantity',
    example: 200,
  })
  readonly maxKeywordsQuantity: number;

  @ApiProperty({
    description: 'The number of used keywords',
    example: 10,
  })
  readonly usedKeywordsQuantity: number;

  @ApiProperty({
    description:
      'Indicated if the user has exceeded the available keywords quantity',
    example: false,
  })
  readonly exceeded: boolean;
}

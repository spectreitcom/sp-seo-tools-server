import { ApiProperty } from '@nestjs/swagger';
import { DESKTOP_DEVICE } from '../../domain/constants';

export class GetAllDevicesQueryResponseItemSwagger {
  @ApiProperty({
    example: 'Desktop',
  })
  readonly label: string;

  @ApiProperty({
    example: DESKTOP_DEVICE,
  })
  readonly value: string;
}

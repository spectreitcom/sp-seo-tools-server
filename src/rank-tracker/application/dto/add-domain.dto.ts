import { IsNotEmpty } from 'class-validator';
import { IsDomain } from '../custom-validators/is-domain';
import { ApiProperty } from '@nestjs/swagger';

export class AddDomainDto {
  @ApiProperty({
    description: 'The domain value.',
    example: 'example.com',
  })
  @IsNotEmpty()
  @IsDomain()
  readonly domain: string;
}

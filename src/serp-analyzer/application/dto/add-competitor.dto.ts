import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCompetitorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}

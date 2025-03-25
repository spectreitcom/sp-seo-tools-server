import { ApiProperty } from '@nestjs/swagger';

export class GetCurrentUserQueryResponse {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  readonly email: string;
  @ApiProperty({
    example: 'https://google-example/something',
  })
  readonly picture: string;
}

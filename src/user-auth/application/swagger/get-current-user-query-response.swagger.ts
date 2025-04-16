import { ApiProperty } from '@nestjs/swagger';

export class GetCurrentUserQueryResponseSwagger {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  readonly email: string;
  @ApiProperty({
    example: 'https://google-example/something',
  })
  readonly picture: string;
}

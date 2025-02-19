import { IsNotEmpty } from 'class-validator';

export class AddDomainDto {
  @IsNotEmpty()
  readonly domain: string;
}

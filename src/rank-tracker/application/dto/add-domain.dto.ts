import { IsNotEmpty } from 'class-validator';
import { IsDomain } from '../custom-validators/is-domain';

export class AddDomainDto {
  @IsNotEmpty()
  @IsDomain()
  readonly domain: string;
}

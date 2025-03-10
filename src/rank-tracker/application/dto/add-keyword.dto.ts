import { IsNotEmpty, IsUUID, IsIn } from 'class-validator';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from '../constants';

export class AddKeywordDto {
  @IsNotEmpty()
  @IsUUID()
  readonly domainId: string;

  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @IsIn([DESKTOP_DEVICE, TABLET_DEVICE, MOBILE_DEVICE])
  readonly device: string;

  @IsNotEmpty()
  @IsUUID()
  readonly localizationId: string;
}

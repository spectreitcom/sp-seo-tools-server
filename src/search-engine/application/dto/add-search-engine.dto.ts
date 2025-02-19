import { ESearchEngine } from '@prisma/client';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class AddSearchEngineDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEnum(ESearchEngine)
  readonly engineKey: ESearchEngine;
}

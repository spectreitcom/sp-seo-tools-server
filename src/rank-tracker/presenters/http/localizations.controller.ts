import { Controller, Get } from '@nestjs/common';
import { LocalizationsService } from '../../application/services/localizations.service';

@Controller('rank-tracker/localizations')
export class LocalizationsController {
  constructor(private readonly localizationsService: LocalizationsService) {}

  @Get('country-codes')
  getAllLocalizationsCountryCodes() {
    return this.localizationsService.getAllLocalizationsCountryCodes();
  }
}

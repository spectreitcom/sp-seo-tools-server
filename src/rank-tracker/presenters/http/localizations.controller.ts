import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocalizationsService } from '../../application/services/localizations.service';
import { AuthGuard } from '../../application/guards/auth.guard';

@Controller('rank-tracker/localizations')
export class LocalizationsController {
  constructor(private readonly localizationsService: LocalizationsService) {}

  @Get('country-codes')
  @UseGuards(AuthGuard)
  getAllLocalizationsCountryCodes() {
    return this.localizationsService.getAllLocalizationsCountryCodes();
  }
}

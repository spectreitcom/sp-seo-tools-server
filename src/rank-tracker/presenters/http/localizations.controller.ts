import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { LocalizationsService } from '../../application/services/localizations.service';
import { AuthGuard } from '../../application/guards/auth.guard';

@Controller('rank-tracker/localizations')
export class LocalizationsController {
  constructor(private readonly localizationsService: LocalizationsService) {}

  @Get(':searchEngineId')
  @UseGuards(AuthGuard)
  getLocalizationsForSearchEngine(
    @Param('searchEngineId', new ParseUUIDPipe()) searchEngineId: string,
  ) {
    return this.localizationsService.getLocalizationsForSearchEngine(
      searchEngineId,
    );
  }

  @Get('country-codes')
  @UseGuards(AuthGuard)
  getAllLocalizationsCountryCodes() {
    return this.localizationsService.getAllLocalizationsCountryCodes();
  }
}

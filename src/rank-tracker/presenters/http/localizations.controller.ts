import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { LocalizationsService } from '../../application/services/localizations.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetLocalizationQueryResponse } from '../../application/swagger/get-localization-query-response';

@Controller('rank-tracker/localizations')
export class LocalizationsController {
  constructor(private readonly localizationsService: LocalizationsService) {}

  @ApiOperation({
    deprecated: true,
  })
  @Get('country-codes')
  @UseGuards(AuthGuard)
  getAllLocalizationsCountryCodes() {
    return this.localizationsService.getAllLocalizationsCountryCodes();
  }

  @ApiOperation({
    summary: 'Returns all localizations for google search engine',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLocalizationQueryResponse,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  getLocalizationsForSearchEngine() {
    return this.localizationsService.getLocalizations();
  }
}

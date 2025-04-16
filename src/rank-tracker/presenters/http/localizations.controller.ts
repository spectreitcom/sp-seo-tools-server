import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { LocalizationsService } from '../../application/services/localizations.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetLocalizationQueryResponseSwagger } from '../../application/swagger/get-localization-query-response.swagger';

@Controller('rank-tracker/localizations')
export class LocalizationsController {
  constructor(private readonly localizationsService: LocalizationsService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    deprecated: true,
  })
  @Get('country-codes')
  @UseGuards(AuthGuard)
  getAllLocalizationsCountryCodes() {
    return this.localizationsService.getAllLocalizationsCountryCodes();
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns all localizations for google search engine',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLocalizationQueryResponseSwagger,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  getLocalizationsForSearchEngine() {
    return this.localizationsService.getLocalizations();
  }
}

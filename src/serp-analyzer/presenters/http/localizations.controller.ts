import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { LocalizationService } from '../../application/services/localization.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../application/guards/auth.guard';
import { LocalizationReadModelSwagger } from '../../application/swagger/localization.read-model.swagger';

@Controller('serp-analyzer/localizations')
export class LocalizationsController {
  constructor(private readonly localizationService: LocalizationService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns all localizations for google search engine',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: LocalizationReadModelSwagger,
  })
  @Get()
  @UseGuards(AuthGuard)
  getAllLocalizations() {
    return this.localizationService.getAllLocalizations();
  }
}

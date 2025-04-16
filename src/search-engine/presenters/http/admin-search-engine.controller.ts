import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';
import { AdminAuthGuard } from '../../application/guards/admin-auth.guard';
import { AddLocalizationDto } from '../../application/dto/add-localization.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin/search-engines')
export class AdminSearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @ApiBearerAuth('admin-auth')
  @ApiOperation({
    summary: 'Creates localization for google search engine',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Localization created',
  })
  @UseGuards(AdminAuthGuard)
  @Post('localizations')
  async addLocalization(@Body() payload: AddLocalizationDto) {
    return this.searchEngineService.addLocalization(payload);
  }
}

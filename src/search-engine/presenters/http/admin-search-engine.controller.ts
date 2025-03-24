import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';
import { AdminAuthGuard } from '../../application/guards/admin-auth.guard';
import { AddLocalizationDto } from '../../application/dto/add-localization.dto';

@Controller('admin/search-engines')
export class AdminSearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @UseGuards(AdminAuthGuard)
  @Post('localizations')
  async addLocalization(@Body() payload: AddLocalizationDto) {
    return this.searchEngineService.addLocalization(payload);
  }
}

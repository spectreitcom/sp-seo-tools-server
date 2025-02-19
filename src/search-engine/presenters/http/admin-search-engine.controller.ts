import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';
import { AdminAuthGuard } from '../../application/guards/admin-auth.guard';
import { AddSearchEngineDto } from '../../application/dto/add-search-engine.dto';
import { AddLocalizationDto } from '../../application/dto/add-localization.dto';

@Controller('admin/search-engines')
export class AdminSearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  async addSearchEngine(@Body() payload: AddSearchEngineDto) {
    return this.searchEngineService.addSearchEngine(payload);
  }

  @UseGuards(AdminAuthGuard)
  @Post(':searchEngineId/localizations')
  async addLocalization(
    @Body() payload: AddLocalizationDto,
    @Param('searchEngineId', new ParseUUIDPipe()) searchEngineId: string,
  ) {
    return this.searchEngineService.addLocalization(searchEngineId, payload);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';
import { AuthGuard } from '../../application/guards/auth.guard';

@Controller('rank-tracker/search-engines')
export class SearchEnginesController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllSearchEngines() {
    return this.searchEngineService.getAllSearchEngines();
  }
}

import { Controller, Get } from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';

@Controller('rank-tracker/search-engines')
export class SearchEnginesController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get()
  getAllSearchEngines() {
    return this.searchEngineService.getAllSearchEngines();
  }
}

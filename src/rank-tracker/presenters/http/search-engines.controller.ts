import { Controller, Get, UseGuards } from '@nestjs/common';
import { SearchEngineService } from '../../application/services/search-engine.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@Controller('rank-tracker/search-engines')
export class SearchEnginesController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllSearchEngines(@CurrentUserId() userId: string) {
    return this.searchEngineService.getAllSearchEngines(userId);
  }
}

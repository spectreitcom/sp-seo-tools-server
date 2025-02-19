import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KeywordService } from '../../application/services/keyword.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@Controller('rank-tracker/keywords')
export class KeywordsController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUserKeywordsList(
    @Query('page') page: number,
    @Query('searchText') searchText: string,
    @Query('localizationId') localizationId: string,
    @Query('searchEngineId') searchEngineId: string,
    @Query('device') device: string,
    @Query('domainId') domainId: string,
    @CurrentUserId() userId: string, // todo;
  ) {
    return this.keywordService.getUserKeywordsList(
      userId,
      page && page > 0 ? page : 1,
      searchText,
      localizationId,
      searchEngineId,
      device,
      domainId,
    );
  }

  @Delete(':keywordId')
  @UseGuards(AuthGuard)
  deleteKeyword(
    @Param('keywordId', new ParseUUIDPipe()) keywordId: string,
    userId: string, // todo;
  ) {
    return this.keywordService.delete(keywordId, userId);
  }
}

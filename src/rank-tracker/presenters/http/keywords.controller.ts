import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KeywordService } from '../../application/services/keyword.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { AddKeywordDto } from '../../application/dto/add-keyword.dto';

@Controller('rank-tracker/keywords')
export class KeywordsController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post()
  @UseGuards(AuthGuard)
  addKeyword(@CurrentUserId() userId: string, @Body() payload: AddKeywordDto) {
    return this.keywordService.addKeyword(userId, payload);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserKeywordsList(
    @Query('page') page: number,
    @Query('searchText') searchText: string,
    @Query('localizationId') localizationId: string,
    @Query('searchEngineId') searchEngineId: string,
    @Query('device') device: string,
    @Query('domainId') domainId: string,
    @CurrentUserId() userId: string,
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

  @Get(':keyword')
  @UseGuards(AuthGuard)
  getUserKeyword(
    @Param('keywordId', new ParseUUIDPipe()) keywordId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.getUserKeyword(keywordId, userId);
  }

  @Delete(':keywordId')
  @UseGuards(AuthGuard)
  deleteKeyword(
    @Param('keywordId', new ParseUUIDPipe()) keywordId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.delete(keywordId, userId);
  }
}

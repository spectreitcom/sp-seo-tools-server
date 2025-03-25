import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserKeywordsListQueryResponse } from '../../application/swagger/get-user-keywords-list-query-response';
import { AvailableKeywordsQuantityDto } from '../../application/swagger/available-keywords-quantity.dto';
import { UserKeywordsListItemDto } from '../../application/swagger/user-keywords-list-item.dto';

@Controller('rank-tracker/keywords')
export class KeywordsController {
  constructor(private readonly keywordService: KeywordService) {}

  @ApiOperation({
    summary: 'Creates a new keyword',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Keyword created',
  })
  @Post()
  @UseGuards(AuthGuard)
  addKeyword(@CurrentUserId() userId: string, @Body() payload: AddKeywordDto) {
    return this.keywordService.addKeyword(userId, payload);
  }

  @ApiOperation({
    summary: "Returns user's keywords list",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserKeywordsListQueryResponse,
  })
  @Get()
  @UseGuards(AuthGuard)
  getUserKeywordsList(
    @Query('page') page: number,
    @Query('searchText') searchText: string,
    @Query('localizationId') localizationId: string,
    @Query('device') device: string,
    @Query('domainId') domainId: string,
    @Query('take') take: number,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.getUserKeywordsList(
      userId,
      page && page > 0 ? page : 1,
      searchText ? searchText : undefined,
      localizationId ? localizationId : undefined,
      device ? device : undefined,
      domainId ? domainId : undefined,
      take ? take : 30,
    );
  }

  @ApiOperation({
    summary: "Returns available keywords quantity for user's account",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AvailableKeywordsQuantityDto,
  })
  @Get('available-quantity')
  @UseGuards(AuthGuard)
  getAvailableKeywordsQuantity(@CurrentUserId() userId: string) {
    return this.keywordService.getAvailableKeywordsQuantity(userId);
  }

  @ApiOperation({
    summary: 'Returns keyword data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserKeywordsListItemDto,
  })
  @Get(':keywordId')
  @UseGuards(AuthGuard)
  getUserKeyword(
    @Param('keywordId', new ParseUUIDPipe()) keywordId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.getUserKeyword(keywordId, userId);
  }

  @ApiOperation({
    summary: 'Returns keyword and associated history',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Keyword was removed',
  })
  @Delete(':keywordId')
  @UseGuards(AuthGuard)
  deleteKeyword(
    @Param('keywordId', new ParseUUIDPipe()) keywordId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.delete(keywordId, userId);
  }
}

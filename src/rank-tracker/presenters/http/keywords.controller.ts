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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserKeywordsListQueryResponseSwagger } from '../../application/swagger/get-user-keywords-list-query-response.swagger';
import { AvailableKeywordsQuantityDtoSwagger } from '../../application/swagger/available-keywords-quantity.dto.swagger';
import { UserKeywordsListItemDto } from '../../application/swagger/user-keywords-list-item.dto';
import { UserKeywordsListQueryParamsDto } from '../../application/dto/user-keywords-list-query-params.dto';

@Controller('rank-tracker/keywords')
export class KeywordsController {
  constructor(private readonly keywordService: KeywordService) {}

  @ApiBearerAuth('user-auth')
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

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns user's keywords list",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserKeywordsListQueryResponseSwagger,
  })
  @Get()
  @UseGuards(AuthGuard)
  getUserKeywordsList(
    @Query() queryParams: UserKeywordsListQueryParamsDto,
    @CurrentUserId() userId: string,
  ) {
    return this.keywordService.getUserKeywordsList(
      userId,
      queryParams.page,
      queryParams.searchText,
      queryParams.localizationId,
      queryParams.device,
      queryParams.domainId,
      queryParams.take,
    );
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns available keywords quantity for user's account",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AvailableKeywordsQuantityDtoSwagger,
  })
  @Get('available-quantity')
  @UseGuards(AuthGuard)
  getAvailableKeywordsQuantity(@CurrentUserId() userId: string) {
    return this.keywordService.getAvailableKeywordsQuantity(userId);
  }

  @ApiBearerAuth('user-auth')
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

  @ApiBearerAuth('user-auth')
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

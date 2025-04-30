import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../application/guards/auth.guard';
import { DomainHistoryPositionService } from '../../application/services/domain-history-position.service';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetKeywordPositionHistoryQueryResponseSwagger } from '../../application/swagger/get-keyword-position-history-query-response.swagger';
import { DomainPositionHistoryQueryParamsDto } from '../../application/dto/domain-position-history-query-params.dto';
import { KeywordIdDto } from '../../application/dto/keyword-id.dto';

@Controller('rank-tracker/domain-history-position')
export class DomainPositionHistoryController {
  constructor(
    private readonly domainHistoryPositionService: DomainHistoryPositionService,
  ) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns the history of positions for a given keyword',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetKeywordPositionHistoryQueryResponseSwagger,
  })
  @Get(':keywordId')
  @UseGuards(AuthGuard)
  async getDomainPositionHistory(
    @Param() params: KeywordIdDto,
    @CurrentUserId() userId: string,
    @Query() queryParams: DomainPositionHistoryQueryParamsDto,
  ) {
    return this.domainHistoryPositionService.getDomainHistoryPosition(
      params.keywordId,
      userId,
      queryParams.fromDate,
      queryParams.toDate,
      queryParams.page,
      queryParams.take,
    );
  }
}

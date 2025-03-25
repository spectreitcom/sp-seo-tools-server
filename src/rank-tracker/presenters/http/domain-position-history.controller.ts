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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetKeywordPositionHistoryQueryResponse } from '../../application/swagger/get-keyword-position-history-query-response';

@Controller('rank-tracker/domain-history-position')
export class DomainPositionHistoryController {
  constructor(
    private readonly domainHistoryPositionService: DomainHistoryPositionService,
  ) {}

  @ApiOperation({
    summary: 'Returns the history of positions for a given keyword',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetKeywordPositionHistoryQueryResponse,
  })
  @Get(':keywordId')
  @UseGuards(AuthGuard)
  async getDomainPositionHistory(
    @Param('keywordId') keywordId: string,
    @CurrentUserId() userId: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    return this.domainHistoryPositionService.getDomainHistoryPosition(
      keywordId,
      userId,
      fromDate,
      toDate,
      page && page > 0 ? page : 1,
      take ? take : 30,
    );
  }
}

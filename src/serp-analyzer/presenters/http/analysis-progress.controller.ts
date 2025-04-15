import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AnalysisProgressService } from '../../application/services/analysis-progress.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetProgressQueryResponseSwagger } from '../../application/swagger/get-progress-query-response.swagger';

@Controller('serp-analyzer/analysis-progress')
export class AnalysisProgressController {
  constructor(
    private readonly analysisProgressService: AnalysisProgressService,
  ) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns the current progress of the analysis',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProgressQueryResponseSwagger,
  })
  @Get(':analysisId')
  @UseGuards(AuthGuard)
  getProgress(
    @CurrentUserId() userId: string,
    @Param('analysisId') analysisId: string,
  ) {
    return this.analysisProgressService.getProgress(userId, analysisId);
  }
}

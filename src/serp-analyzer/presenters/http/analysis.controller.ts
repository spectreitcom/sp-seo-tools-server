import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AnalysisService } from '../../application/services/analysis.service';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { CreateAnalysisDto } from '../../application/dto/create-analysis.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('serp-analyzer/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Creates an analysis',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'An analysis created',
  })
  @Post()
  @UseGuards(AuthGuard)
  createAnalysis(
    @CurrentUserId() userId: string,
    @Body() payload: CreateAnalysisDto,
  ) {
    return this.analysisService.createAnalysis(userId, payload);
  }
}

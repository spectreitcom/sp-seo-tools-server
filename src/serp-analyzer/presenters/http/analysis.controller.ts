import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalysisService } from '../../application/services/analysis.service';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { CreateAnalysisDto } from '../../application/dto/create-analysis.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserAnalysisListQueryParamsDto } from '../../application/dto/get-user-analysis-list-query-params.dto';
import { GetUserAnalysisListResponse } from '../../application/swagger/get-user-analysis-list-response';

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

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns the list of user's analysis",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserAnalysisListResponse,
  })
  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getUserAnalysisList(
    @CurrentUserId() userId: string,
    @Query() queryParams: GetUserAnalysisListQueryParamsDto,
  ) {
    return this.analysisService.getUserAnalysisList(
      userId,
      queryParams.page,
      queryParams.take,
      queryParams.localizationId,
      queryParams.device,
      queryParams.searchText,
    );
  }
}

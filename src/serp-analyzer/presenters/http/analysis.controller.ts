import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalysisService } from '../../application/services/analysis.service';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { CreateAnalysisDto } from '../../application/dto/create-analysis.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUserAnalysisListQueryParamsDto } from '../../application/dto/get-user-analysis-list-query-params.dto';
import { GetUserAnalysisListResponseSwagger } from '../../application/swagger/get-user-analysis-list-response.swagger';
import { GetUserMonthlyUsageQueryResponseSwagger } from '../../application/swagger/get-user-monthly-usage-query-response.swagger';
import { AddCompetitorDto } from '../../application/dto/add-competitor.dto';
import { AnalysisIdDto } from '../../application/dto/analysis-id.dto';

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
    type: GetUserAnalysisListResponseSwagger,
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

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns the user's monthly usage quota",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserMonthlyUsageQueryResponseSwagger,
  })
  @HttpCode(HttpStatus.OK)
  @Get('usage')
  @UseGuards(AuthGuard)
  getUserMonthlyUsage(@CurrentUserId() userId: string) {
    return this.analysisService.getUserMonthlyUsage(userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Adds a competitor to the analysis',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Competitor was added',
  })
  @ApiParam({
    name: 'analysisId',
    description: 'The ID of the analysis',
    type: String,
    format: 'uuid',
  })
  @Post(':analysisId/add-competitor')
  @UseGuards(AuthGuard)
  addCompetitor(
    @Param() params: AnalysisIdDto,
    @CurrentUserId() userId: string,
    @Body() payload: AddCompetitorDto,
  ) {
    return this.analysisService.addCompetitor(
      userId,
      params.analysisId,
      payload.url,
    );
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns the details of the analysis',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the complex data of the analysis',
  })
  @ApiParam({
    name: 'analysisId',
    description: 'The ID of the analysis',
    type: String,
    format: 'uuid',
  })
  @Get(':analysisId')
  @UseGuards(AuthGuard)
  getAnalysisDetails(
    @Param() params: AnalysisIdDto,
    @CurrentUserId() userId: string,
  ) {
    return this.analysisService.getAnalysisDetails(userId, params.analysisId);
  }
}

import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../application/guards/auth.guard';
import { SubscriptionService } from '../../application/services/subscription.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionReadModelSwagger } from '../../application/swagger/subscription.read-model.swagger';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@ApiTags('SerpAnalyzerSubscriptionController')
@Controller('serp-analyzer-subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns all subscription plans',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: SubscriptionReadModelSwagger,
  })
  @Get()
  @UseGuards(AuthGuard)
  getSubscriptions() {
    return this.subscriptionService.getSubscriptions();
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns current user's plan",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionReadModelSwagger,
  })
  @Get('current-plan')
  @UseGuards(AuthGuard)
  getCurrentUserPlan(@CurrentUserId() userId: string) {
    return this.subscriptionService.getCurrentUserPlan(userId);
  }
}

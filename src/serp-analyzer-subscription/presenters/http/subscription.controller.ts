import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../application/guards/auth.guard';
import { SubscriptionService } from '../../application/services/subscription.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionReadModel } from '../../application/swagger/subscription.read-model';

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
    type: SubscriptionReadModel,
  })
  @Get()
  @UseGuards(AuthGuard)
  getSubscriptions() {
    return this.subscriptionService.getSubscriptions();
  }
}

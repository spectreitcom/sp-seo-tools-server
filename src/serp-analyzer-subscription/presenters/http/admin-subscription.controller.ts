import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from '../../application/services/subscription.service';
import { CreateSubscriptionDto } from '../../application/dto/create-subscription.dto';
import { AdminAuthGuard } from '../../application/guards/admin-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin/serp-analyzer-subscription')
export class AdminSubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({
    summary: 'Creates a new subscription plan',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created a new subscription plan',
  })
  @Post()
  @UseGuards(AdminAuthGuard)
  async createSubscription(@Body() payload: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(payload);
  }
}

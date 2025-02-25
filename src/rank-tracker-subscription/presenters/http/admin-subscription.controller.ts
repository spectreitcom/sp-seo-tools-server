import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from '../../application/services/subscription.service';
import { CreateSubscriptionDto } from '../../application/dto/create-subscription.dto';
import { AdminAuthGuard } from '../../application/guards/admin-auth.guard';

@Controller('admin/rank-tracker-subscription')
export class AdminSubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  createSubscription(@Body() payload: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(payload);
  }
}

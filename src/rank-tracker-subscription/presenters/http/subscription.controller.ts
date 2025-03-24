import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from '../../application/services/payment.service';
import { Request } from 'express';
import { CreateCheckoutSessionDto } from '../../application/dto/create-checkout-session.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { SubscriptionService } from '../../application/services/subscription.service';

@Controller('rank-tracker-subscription')
export class SubscriptionController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  webhook(@Req() request: Request) {
    return this.paymentService.webhookHandler(request);
  }

  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  createCheckoutSession(
    @Body() payload: CreateCheckoutSessionDto,
    @CurrentUserId() userId: string,
  ) {
    return this.paymentService.createCheckoutSession(payload, userId);
  }

  @Post('create-session-portal')
  @UseGuards(AuthGuard)
  createSessionPortal(@CurrentUserId() userId: string) {
    return this.paymentService.createSessionPortal(userId);
  }

  @Get('subscriptions')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getSubscriptions(@CurrentUserId() userId: string) {
    return this.subscriptionService.getSubscriptions(userId);
  }

  @Get('current-plan')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getCurrenPlan(@CurrentUserId() userId: string) {
    return this.subscriptionService.getCurrentPlan(userId);
  }
}

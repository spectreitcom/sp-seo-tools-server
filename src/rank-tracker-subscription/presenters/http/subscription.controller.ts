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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionListItemDto } from '../../application/swagger/subscription-list-item.dto';

@Controller('rank-tracker-subscription')
export class SubscriptionController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @ApiOperation({
    summary: "Webhook for Stripe's events",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Received Stripe's event",
  })
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  webhook(@Req() request: Request) {
    return this.paymentService.webhookHandler(request);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Creates a checkout session',
  })
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  createCheckoutSession(
    @Body() payload: CreateCheckoutSessionDto,
    @CurrentUserId() userId: string,
  ) {
    return this.paymentService.createCheckoutSession(payload, userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Creates a session portal',
  })
  @Post('create-session-portal')
  @UseGuards(AuthGuard)
  createSessionPortal(@CurrentUserId() userId: string) {
    return this.paymentService.createSessionPortal(userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns all plans',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionListItemDto,
    isArray: true,
  })
  @Get('subscriptions')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getSubscriptions(@CurrentUserId() userId: string) {
    return this.subscriptionService.getSubscriptions(userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Returns user's current plan",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionListItemDto,
  })
  @Get('current-plan')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getCurrenPlan(@CurrentUserId() userId: string) {
    return this.subscriptionService.getCurrentPlan(userId);
  }
}

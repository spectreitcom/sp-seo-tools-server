import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCheckoutSessionDto } from '../../application/dto/create-checkout-session.dto';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { AuthGuard } from '../../application/guards/auth.guard';
import { PaymentService } from '../../application/services/payment.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCheckoutSessionResponse } from '../../application/swagger/create-checkout-session-response';
import { CreateSessionPortalResponse } from '../../application/swagger/create-session-portal-response';
import { Request } from 'express';

@Controller('serp-analyzer-payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Creates a checkout session',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateCheckoutSessionResponse,
  })
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  createCheckoutSession(
    @Body() payload: CreateCheckoutSessionDto,
    @CurrentUserId() userId: string,
  ) {
    return this.paymentService.createCheckoutSession(payload, userId);
  }

  @ApiOperation({
    summary: 'Creates a session portal',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateSessionPortalResponse,
    description: 'Created a session portal',
  })
  @Post('create-session-portal')
  @UseGuards(AuthGuard)
  createSessionPortal(@CurrentUserId() userId: string) {
    return this.paymentService.createSessionPortal(userId);
  }

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
}

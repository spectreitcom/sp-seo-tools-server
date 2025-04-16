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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCheckoutSessionResponseSwagger } from '../../application/swagger/create-checkout-session-response.swagger';
import { CreateSessionPortalResponseSwagger } from '../../application/swagger/create-session-portal-response.swagger';
import { Request } from 'express';

@Controller('serp-analyzer-payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Creates a checkout session',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateCheckoutSessionResponseSwagger,
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateSessionPortalResponseSwagger,
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

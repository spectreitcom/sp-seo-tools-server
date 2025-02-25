import { Injectable } from '@nestjs/common';
import { StripeService } from '../application/ports/stripe.service';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppStripeService implements StripeService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }

  getStripe(): Stripe {
    return this.stripe;
  }
}

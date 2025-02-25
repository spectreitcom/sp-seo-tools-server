import { Stripe } from 'stripe';

export abstract class StripeService {
  abstract getStripe(): Stripe;
}

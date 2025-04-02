import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCheckoutSessionCommand } from '../commands/create-checkout-session.command';
import { StripeService } from '../ports/stripe.service';
import { SubscriptionRepository } from '../ports/subscription.repository';
import { BadRequestException } from '@nestjs/common';
import { UserAuthFacade } from '../../../user-auth/application/user-auth.facade';
import { ConfigService } from '@nestjs/config';

export type CreateCheckoutSessionResponse = {
  sessionUrl: string;
};

@CommandHandler(CreateCheckoutSessionCommand)
export class CreateCheckoutSessionCommandHandler
  implements
    ICommandHandler<CreateCheckoutSessionCommand, CreateCheckoutSessionResponse>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userAuthFacade: UserAuthFacade,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: CreateCheckoutSessionCommand,
  ): Promise<CreateCheckoutSessionResponse> {
    const { subscriptionId, userId } = command;

    const subscription =
      await this.subscriptionRepository.findById(subscriptionId);

    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }

    const user = await this.userAuthFacade.getUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const price = await this.stripeService
      .getStripe()
      .prices.retrieve(subscription.getPriceId());

    if (!price) {
      throw new BadRequestException('Price not found');
    }

    const SUCCESS_URL = this.configService.get<string>(
      'STRIPE_SERP_ANALYZER_SUCCESS_URL',
    );

    const CANCEL_URL = this.configService.get<string>(
      'STRIPE_SERP_ANALYZER_CANCEL_URL',
    );

    const session = await this.stripeService
      .getStripe()
      .checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: CANCEL_URL,
        metadata: {
          userId: user.id,
          subscriptionId,
          productType: 'serp-analyzer',
        },
      });

    return {
      sessionUrl: session.url,
    };
  }
}

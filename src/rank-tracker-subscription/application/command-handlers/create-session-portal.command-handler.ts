import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionPortalCommand } from '../commands/create-session-portal.command';
import { StripeService } from '../ports/stripe.service';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type CreateSessionPortalCommandResponse = {
  url: string;
};

@CommandHandler(CreateSessionPortalCommand)
export class CreateSessionPortalCommandHandler
  implements
    ICommandHandler<
      CreateSessionPortalCommand,
      CreateSessionPortalCommandResponse
    >
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: CreateSessionPortalCommand,
  ): Promise<CreateSessionPortalCommandResponse> {
    const { userId } = command;

    const userSubscription =
      await this.userSubscriptionRepository.findByUser(userId);

    if (!userSubscription) {
      throw new BadRequestException('User not found');
    }

    const checkoutSession = await this.stripeService
      .getStripe()
      .checkout.sessions.retrieve(userSubscription.getSessionId());

    const returnUrl = this.configService.get<string>('RANK_TRACKER_DASHBOARD');

    const portalSession = await this.stripeService
      .getStripe()
      .billingPortal.sessions.create({
        customer: checkoutSession.customer.toString(),
        return_url: returnUrl,
      });

    return {
      url: portalSession.url,
    };
  }
}

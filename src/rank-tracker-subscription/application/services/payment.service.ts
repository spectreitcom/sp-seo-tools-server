import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CommandBus, EventPublisher } from '@nestjs/cqrs';
import { CreateCheckoutSessionCommand } from '../commands/create-checkout-session.command';
import { CreateCheckoutSessionResponse } from '../command-handlers/create-checkout-session.command-handler';
import { CreateCheckoutSessionDto } from '../dto/create-checkout-session.dto';
import { Stripe } from 'stripe';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';
import { UserSubscriptionFactory } from '../../domain/factories/user-subscription.factory';
import { CreateSessionPortalCommand } from '../commands/create-session-portal.command';
import { CreateSessionPortalCommandResponse } from '../command-handlers/create-session-portal.command-handler';

type Metadata = {
  userId: string;
  subscriptionId: string;
  productType: 'rank-tracker';
};

@Injectable()
export class PaymentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async webhookHandler(request: Request) {
    const event = request.body as Stripe.Event;

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleSessionCompleted(
          event.data.object.metadata as Metadata,
          event.data.object.id,
        );
        break;
      case 'customer.subscription.deleted':
        // todo;
        break;
    }
  }

  async createCheckoutSession(
    payload: CreateCheckoutSessionDto,
    userId: string,
  ) {
    return this.commandBus.execute<
      CreateCheckoutSessionCommand,
      CreateCheckoutSessionResponse
    >(new CreateCheckoutSessionCommand(payload.subscriptionId, userId));
  }

  async createSessionPortal(userId: string) {
    return this.commandBus.execute<
      CreateSessionPortalCommand,
      CreateSessionPortalCommandResponse
    >(new CreateSessionPortalCommand(userId));
  }

  private async handleSessionCompleted(metadata: Metadata, sessionId: string) {
    if (metadata.productType === 'rank-tracker') {
      const { userId, subscriptionId } = metadata;
      let userSubscription =
        await this.userSubscriptionRepository.findByUser(userId);

      if (!userSubscription) {
        userSubscription = UserSubscriptionFactory.create(
          userId,
          subscriptionId,
          sessionId,
        );
      }

      userSubscription.activate();
      this.eventPublisher.mergeObjectContext(userSubscription);
      await this.userSubscriptionRepository.save(userSubscription);
      userSubscription.commit();
    }
  }
}

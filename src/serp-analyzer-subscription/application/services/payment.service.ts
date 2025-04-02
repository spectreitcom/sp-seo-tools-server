import { Injectable } from '@nestjs/common';
import { CreateCheckoutSessionDto } from '../dto/create-checkout-session.dto';
import { CommandBus, EventPublisher } from '@nestjs/cqrs';
import { CreateCheckoutSessionCommand } from '../commands/create-checkout-session.command';
import { CreateCheckoutSessionResponse } from '../command-handlers/create-checkout-session.command-handler';
import { CreateSessionPortalCommand } from '../commands/create-session-portal.command';
import { CreateSessionPortalCommandResponse } from '../command-handlers/create-session-portal.command-handler';
import { Request } from 'express';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';
import { Stripe } from 'stripe';
import { UserSubscriptionFactory } from '../../domain/factories/user-subscription.factory';
import { DeactivateSubscriptionCommand } from '../commands/deactivate-subscription.command';

type Metadata = {
  userId: string;
  subscriptionId: string;
  productType: 'serp-analyzer';
};

@Injectable()
export class PaymentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventPublisher: EventPublisher,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
  ) {}

  async createCheckoutSession(
    payload: CreateCheckoutSessionDto,
    userId: string,
  ) {
    return await this.commandBus.execute<
      CreateCheckoutSessionCommand,
      CreateCheckoutSessionResponse
    >(new CreateCheckoutSessionCommand(payload.subscriptionId, userId));
  }

  async createSessionPortal(userId: string) {
    return await this.commandBus.execute<
      CreateSessionPortalCommand,
      CreateSessionPortalCommandResponse
    >(new CreateSessionPortalCommand(userId));
  }

  async webhookHandler(request: Request) {
    const event = request.body as Stripe.Event;
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleSessionCompleted(
          event.data.object.metadata as Metadata,
          event.data.object.id,
          event.data.object.customer.toString(),
        );
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(
          event.data.object.customer.toString(),
        );
        break;
    }
  }

  private async handleSessionCompleted(
    metadata: Metadata,
    sessionId: string,
    customerId: string,
  ) {
    if (metadata.productType === 'serp-analyzer') {
      const { userId, subscriptionId } = metadata;
      let userSubscription =
        await this.userSubscriptionRepository.findByUser(userId);

      if (!userSubscription) {
        userSubscription = UserSubscriptionFactory.create(
          subscriptionId,
          false,
          userId,
          sessionId,
          customerId,
        );
      }

      userSubscription.updateCustomerId(customerId);
      userSubscription.updateSessionId(sessionId);
      userSubscription.activate();
      this.eventPublisher.mergeObjectContext(userSubscription);
      await this.userSubscriptionRepository.save(userSubscription);
      userSubscription.commit();
    }
  }

  private async handleSubscriptionDeleted(customerId: string) {
    return this.commandBus.execute<DeactivateSubscriptionCommand, void>(
      new DeactivateSubscriptionCommand(customerId),
    );
  }
}

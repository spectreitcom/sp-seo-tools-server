import { ICommand } from '@nestjs/cqrs';

export class ActivateSubscriptionCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly subscriptionId: string,
    public readonly sessionId: string,
  ) {}
}

import { ICommand } from '@nestjs/cqrs';

export class DeactivateSubscriptionCommand implements ICommand {
  constructor(public readonly customerId: string) {}
}

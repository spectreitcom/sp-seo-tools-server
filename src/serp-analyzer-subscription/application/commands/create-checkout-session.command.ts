import { ICommand } from '@nestjs/cqrs';

export class CreateCheckoutSessionCommand implements ICommand {
  constructor(
    public readonly subscriptionId: string,
    public readonly userId: string,
  ) {}
}

import { SubscriptionReadModel } from '../../infrastructure/read-models/subscription.read-model';

export abstract class SubscriptionReadRepository {
  abstract findAll(): Promise<SubscriptionReadModel[]>;
}

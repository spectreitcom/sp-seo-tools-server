import { SaUserSubscription } from '@prisma/client';
import { UserSubscription } from '../user-subscription';

export class UserSubscriptionMapper {
  static toDomain(model: SaUserSubscription) {
    return new UserSubscription(
      model.id,
      model.subscriptionId,
      model.active,
      model.userId,
      model.sessionId,
      model.customerId,
    );
  }
}

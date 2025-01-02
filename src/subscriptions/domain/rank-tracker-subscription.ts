import {
  SubscriptionActivationError,
  SubscriptionCancellationError,
} from './exceptions';
import { ActiveSubscriptionValue } from './value-objects/active-subscription-value';

export class RankTrackerSubscription {
  constructor(private active: ActiveSubscriptionValue) {}

  activate() {
    if (!this.active.isActive()) {
      this.active = new ActiveSubscriptionValue(true);
      return true;
    }
    throw new SubscriptionActivationError();
  }

  cancel() {
    if (this.active.isActive()) {
      this.active = new ActiveSubscriptionValue(true);
      return true;
    }
    throw new SubscriptionCancellationError();
  }
}

import {
  SubscriptionActivationError,
  SubscriptionCancellationError,
} from './exceptions';
import { ActiveSubscriptionValue } from './value-objects/active-subscription-value';

/**
 * @deprecated
 */
export class RankTrackerSubscription {
  constructor(private active: ActiveSubscriptionValue) {}

  activate() {
    if (this.active.isActive()) {
      throw new SubscriptionActivationError();
    }
    this.active = new ActiveSubscriptionValue(true);
  }

  cancel() {
    if (this.active.isInactive()) {
      throw new SubscriptionCancellationError();
    }
    this.active = new ActiveSubscriptionValue(false);
  }

  getActiveValue() {
    return this.active;
  }
}

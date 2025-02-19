import { RankTrackerSubscription } from '../rank-tracker-subscription';
import {
  SubscriptionActivationError,
  SubscriptionCancellationError,
} from '../exceptions';
import { ActiveSubscriptionValue } from '../value-objects/active-subscription-value';

describe('RankTrackerSubscription', () => {
  it('should cancel activated subscription', () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(true));
    sub.cancel();
    expect(sub.getActiveValue().isInactive()).toBeTruthy();
  });

  it("should activate subscription when it's not activated yet", () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(false));
    sub.activate();
    expect(sub.getActiveValue().isActive()).toBeTruthy();
  });

  it('should not activate subscription when there is already active', () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(true));
    expect(() => sub.activate()).toThrow(SubscriptionActivationError);
  });

  it('should not cancel subscription when there is no active subscription', () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(false));
    expect(() => sub.cancel()).toThrow(SubscriptionCancellationError);
  });
});

import { RankTrackerSubscription } from '../rank-tracker-subscription';
import {
  SubscriptionActivationError,
  SubscriptionCancellationError,
} from '../exceptions';
import { ActiveSubscriptionValue } from '../value-objects/active-subscription-value';

describe('RankTrackerSubscription', () => {
  it('should cancel activated subscription', () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(true));
    const result = sub.cancel();
    expect(result).toBeTruthy();
  });

  it("should activate subscription when it's not activated yet", () => {
    const sub = new RankTrackerSubscription(new ActiveSubscriptionValue(false));
    const result = sub.activate();
    expect(result).toBeTruthy();
  });

  it('should not activate subscription when there is already active', () => {
    try {
      const sub = new RankTrackerSubscription(
        new ActiveSubscriptionValue(true),
      );
      sub.activate();
    } catch (e) {
      expect(e).toBeInstanceOf(SubscriptionActivationError);
    }
  });

  it('should not cancel subscription when there is no active subscription', () => {
    try {
      const sub = new RankTrackerSubscription(
        new ActiveSubscriptionValue(false),
      );
      sub.cancel();
    } catch (e) {
      expect(e).toBeInstanceOf(SubscriptionCancellationError);
    }
  });
});

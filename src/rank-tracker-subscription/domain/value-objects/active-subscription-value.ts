export class ActiveSubscriptionValue {
  constructor(public readonly value: boolean) {}

  isActive() {
    return this.value === true;
  }

  isInactive() {
    return this.value === false;
  }
}

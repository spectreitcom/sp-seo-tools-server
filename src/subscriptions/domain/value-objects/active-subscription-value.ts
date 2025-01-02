export class ActiveSubscriptionValue {
  constructor(private value: boolean) {}

  isActive() {
    return this.value === true;
  }
}

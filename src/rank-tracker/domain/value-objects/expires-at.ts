import * as moment from 'moment';

export class ExpiresAt {
  private readonly momentObject: moment.Moment;

  constructor(public readonly value: number) {
    this.momentObject = moment(value * 1000);
  }

  isExpired() {
    const nowObj = moment();
    return this.momentObject.isBefore(nowObj, 'seconds');
  }

  equals(expiresAt: ExpiresAt) {
    return expiresAt.value === this.value;
  }
}

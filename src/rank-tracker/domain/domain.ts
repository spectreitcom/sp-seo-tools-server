import * as moment from 'moment';

export class Domain {
  constructor(
    public readonly domainId: string,
    public readonly text: string,
    public readonly userId: string,
    public readonly createdAt = moment().unix(),
  ) {}
}

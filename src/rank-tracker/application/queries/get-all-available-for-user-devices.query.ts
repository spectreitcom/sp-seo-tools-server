import { IQuery } from '@nestjs/cqrs';

export class GetAllAvailableForUserDevicesQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

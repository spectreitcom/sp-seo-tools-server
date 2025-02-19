import { RtDomain } from '@prisma/client';
import { Domain } from '../domain';

export class DomainMapper {
  static toDomain(rtDomain: RtDomain) {
    const domainId = rtDomain.id;
    const domainText = rtDomain.text;
    const userId = rtDomain.userId;
    return new Domain(domainId, domainText, userId);
  }
}

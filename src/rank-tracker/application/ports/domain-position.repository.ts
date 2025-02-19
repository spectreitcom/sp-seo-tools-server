import { DomainPosition } from '../../domain/domain-position';

export abstract class DomainPositionRepository {
  abstract save(domainPosition: DomainPosition): Promise<void>;
}

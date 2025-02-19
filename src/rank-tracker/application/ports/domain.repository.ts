import { Domain } from '../../domain/domain';

export abstract class DomainRepository {
  abstract save(domain: Domain): Promise<void>;
  abstract findById(domainId: string): Promise<Domain>;
  abstract domainExists(domainText: string, userId: string): Promise<boolean>;
}

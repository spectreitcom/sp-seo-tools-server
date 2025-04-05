import { Query } from '../../domain/query';

export abstract class QueryRepository {
  abstract save(query: Query): Promise<void>;
  abstract findAllPending(take: number, skip: number): Promise<Query[]>;
  abstract findByProcess(processId: string): Promise<Query>;
}

export abstract class CheckingQueryQueueService {
  abstract checkQueries(): Promise<void>;
}

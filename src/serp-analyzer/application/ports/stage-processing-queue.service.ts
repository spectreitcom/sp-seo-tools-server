export abstract class StageProcessingQueueService {
  abstract beginProcessing(pageIds: string[]): Promise<void>;
}

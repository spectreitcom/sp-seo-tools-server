export abstract class DomainPositionProcessingQueueService {
  abstract processPositions(): Promise<void>;
}

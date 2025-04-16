export abstract class PositionCheckerQueueService {
  abstract checkPositions(): Promise<void>;
}

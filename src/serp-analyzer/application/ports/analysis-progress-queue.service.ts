export abstract class AnalysisProgressQueueService {
  abstract incrementProgress(pageId: string): Promise<void>;
}

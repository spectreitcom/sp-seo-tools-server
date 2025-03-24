import { Keyword } from '../../domain/keyword';

export abstract class PositionCheckerService {
  abstract checkPosition(keyword: Keyword): Promise<void>;
}

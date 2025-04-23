import { UserAnalysisReadModel } from '../../infrastructure/read-models/user-analysis.read-model';

export abstract class UserAnalysisRepository {
  abstract findAllByUser(
    userId: string,
    take: number,
    skip: number,
    searchText: string,
    localizationId: string | undefined,
    device: string | undefined,
  ): Promise<UserAnalysisReadModel[]>;

  abstract countAllWithSearchParams(
    userId: string,
    searchText: string,
    localizationId: string | undefined,
    device: string | undefined,
  ): Promise<number>;

  abstract countAllForUser(userId: string): Promise<number>;

  abstract findByIdAndUser(
    analysisId: string,
    userId: string,
  ): Promise<UserAnalysisReadModel>;
}

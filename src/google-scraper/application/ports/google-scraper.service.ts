import { GetDataResponse, SearchResult, SendQueryResponse } from '../types';
import { AxiosResponse } from 'axios';

export abstract class GoogleScraperService {
  abstract getResults(responseId: string): Promise<SearchResult[] | null>;

  abstract sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: string,
  ): Promise<SendQueryResponse>;

  abstract getData(responseId: string): Promise<AxiosResponse<GetDataResponse>>;

  abstract isDataAvailableCondition(statusCode: number): boolean;
}

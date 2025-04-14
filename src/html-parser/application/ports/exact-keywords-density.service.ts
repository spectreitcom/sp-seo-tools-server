export abstract class ExactKeywordsDensityService {
  abstract h1ExactKeywordsDensity(html: string, phrase: string): number;
  abstract h2ExactKeywordsDensity(html: string, phrase: string): number;
  abstract h3ExactKeywordsDensity(html: string, phrase: string): number;
  abstract h4ExactKeywordsDensity(html: string, phrase: string): number;
  abstract h5ExactKeywordsDensity(html: string, phrase: string): number;
  abstract h6ExactKeywordsDensity(html: string, phrase: string): number;
  abstract pExactKeywordsDensity(html: string, phrase: string): number;
  abstract strongExactKeywordsDensity(html: string, phrase: string): number;
  abstract imgAltExactKeywordsDensity(html: string, phrase: string): number;
  abstract titleExactKeywordsDensity(html: string, phrase: string): number;
  abstract metaDescriptionExactKeywordsDensity(
    html: string,
    phrase: string,
  ): number;
  abstract bodyExactKeywordsDensity(html: string, phrase: string): number;
}

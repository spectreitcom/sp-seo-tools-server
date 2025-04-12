export abstract class ExactKeywordsCountService {
  abstract h1ExactKeywordsCount(html: string, phrase: string): number;
  abstract h2ExactKeywordsCount(html: string, phrase: string): number;
  abstract h3ExactKeywordsCount(html: string, phrase: string): number;
  abstract h4ExactKeywordsCount(html: string, phrase: string): number;
  abstract h5ExactKeywordsCount(html: string, phrase: string): number;
  abstract h6ExactKeywordsCount(html: string, phrase: string): number;
  abstract pExactKeywordsCount(html: string, phrase: string): number;
  abstract strongExactKeywordsCount(html: string, phrase: string): number;
  abstract imgAltExactKeywordsCount(html: string, phrase: string): number;
  abstract titleExactKeywordsCount(html: string, phrase: string): number;
  abstract metaDescriptionExactKeywordsCount(
    html: string,
    phrase: string,
  ): number;
  abstract bodyExactKeywordsCount(html: string, phrase: string): number;
}

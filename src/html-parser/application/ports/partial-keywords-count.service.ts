export abstract class PartialKeywordsCountService {
  abstract h1PartialKeywordsCount(html: string, phrase: string): number;
  abstract h2PartialKeywordsCount(html: string, phrase: string): number;
  abstract h3PartialKeywordsCount(html: string, phrase: string): number;
  abstract h4PartialKeywordsCount(html: string, phrase: string): number;
  abstract h5PartialKeywordsCount(html: string, phrase: string): number;
  abstract h6PartialKeywordsCount(html: string, phrase: string): number;
  abstract pPartialKeywordsCount(html: string, phrase: string): number;
  abstract strongPartialKeywordsCount(html: string, phrase: string): number;
  abstract imgAltPartialKeywordsCount(html: string, phrase: string): number;
  abstract titlePartialKeywordsCount(html: string, phrase: string): number;
  abstract metaDescriptionPartialKeywordsCount(
    html: string,
    phrase: string,
  ): number;
  abstract bodyPartialKeywordsCount(html: string, phrase: string): number;
}

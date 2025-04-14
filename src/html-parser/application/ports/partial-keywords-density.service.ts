export abstract class PartialKeywordsDensityService {
  abstract h1PartialKeywordsDensity(html: string, phrase: string): number;
  abstract h2PartialKeywordsDensity(html: string, phrase: string): number;
  abstract h3PartialKeywordsDensity(html: string, phrase: string): number;
  abstract h4PartialKeywordsDensity(html: string, phrase: string): number;
  abstract h5PartialKeywordsDensity(html: string, phrase: string): number;
  abstract h6PartialKeywordsDensity(html: string, phrase: string): number;
  abstract pPartialKeywordsDensity(html: string, phrase: string): number;
  abstract strongPartialKeywordsDensity(html: string, phrase: string): number;
  abstract imgAltPartialKeywordsDensity(html: string, phrase: string): number;
  abstract titlePartialKeywordsDensity(html: string, phrase: string): number;
  abstract metaDescriptionPartialKeywordsDensity(
    html: string,
    phrase: string,
  ): number;
  abstract bodyPartialKeywordsDensity(html: string, phrase: string): number;
}

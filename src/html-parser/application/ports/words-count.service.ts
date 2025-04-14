export abstract class WordsCountService {
  abstract h1WordsCount(html: string): number;
  abstract h2WordsCount(html: string): number;
  abstract h3WordsCount(html: string): number;
  abstract h4WordsCount(html: string): number;
  abstract h5WordsCount(html: string): number;
  abstract h6WordsCount(html: string): number;
  abstract pWordsCount(html: string): number;
  abstract strongWordsCount(html: string): number;
  abstract imgAltWordsCount(html: string): number;
  abstract titleWordsCount(html: string): number;
  abstract metaDescriptionWordsCount(html: string): number;
  abstract bodyWordsCount(html: string): number;
}

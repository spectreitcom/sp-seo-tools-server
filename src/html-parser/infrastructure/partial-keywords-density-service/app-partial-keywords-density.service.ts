import { Injectable } from '@nestjs/common';
import { PartialKeywordsDensityService } from '../../application/ports/partial-keywords-density.service';
import { PartialKeywordsCountService } from '../../application/ports/partial-keywords-count.service';
import { WordsCountService } from '../../application/ports/words-count.service';

@Injectable()
export class AppPartialKeywordsDensityService
  implements PartialKeywordsDensityService
{
  constructor(
    private readonly partialKeywordsCountService: PartialKeywordsCountService,
    private readonly wordsCountService: WordsCountService,
  ) {}

  h1PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h1WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h1PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  h2PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h2WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h2PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  h3PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h3WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h3PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  h4PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h4WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h4PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  h5PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h5WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h5PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  h6PartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h6WordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.h6PartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  pPartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.pWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.pPartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  strongPartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.strongWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.strongPartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  imgAltPartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.imgAltWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.imgAltPartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  titlePartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.titleWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.titlePartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  metaDescriptionPartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.metaDescriptionWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.metaDescriptionPartialKeywordsCount(
        html,
        phrase,
      );
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  bodyPartialKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.bodyWordsCount(html);
    const partialKeywordsCount =
      this.partialKeywordsCountService.bodyPartialKeywordsCount(html, phrase);
    return this.calculateDensity(partialKeywordsCount, wordsCount);
  }

  private calculateDensity(keywordCount: number, wordCount: number) {
    if (wordCount === 0) {
      return 0;
    }
    return (keywordCount / wordCount) * 100;
  }
}

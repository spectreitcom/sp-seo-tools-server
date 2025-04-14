import { Injectable } from '@nestjs/common';
import { ExactKeywordsDensityService } from '../../application/ports/exact-keywords-density.service';
import { ExactKeywordsCountService } from '../../application/ports/exact-keywords-count.service';
import { WordsCountService } from '../../application/ports/words-count.service';

@Injectable()
export class AppExactKeywordsDensityService
  implements ExactKeywordsDensityService
{
  constructor(
    private readonly exactKeywordsCountService: ExactKeywordsCountService,
    private readonly wordsCountService: WordsCountService,
  ) {}

  h1ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h1WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h1ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  h2ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h2WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h2ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  h3ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h3WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h3ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  h4ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h4WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h4ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  h5ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h5WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h5ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  h6ExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.h6WordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.h6ExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  pExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.pWordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.pExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  strongExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.strongWordsCount(html);
    const keywordsCount =
      this.exactKeywordsCountService.strongExactKeywordsCount(html, phrase);
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  imgAltExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.imgAltWordsCount(html);
    const keywordsCount =
      this.exactKeywordsCountService.imgAltExactKeywordsCount(html, phrase);
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  titleExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.titleWordsCount(html);
    const keywordsCount =
      this.exactKeywordsCountService.titleExactKeywordsCount(html, phrase);
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  metaDescriptionExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.metaDescriptionWordsCount(html);
    const keywordsCount =
      this.exactKeywordsCountService.metaDescriptionExactKeywordsCount(
        html,
        phrase,
      );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  bodyExactKeywordsDensity(html: string, phrase: string): number {
    const wordsCount = this.wordsCountService.bodyWordsCount(html);
    const keywordsCount = this.exactKeywordsCountService.bodyExactKeywordsCount(
      html,
      phrase,
    );
    return this.calculateDensity(keywordsCount, wordsCount);
  }

  private calculateDensity(keywordCount: number, wordCount: number) {
    if (wordCount === 0) {
      return 0;
    }
    return (keywordCount / wordCount) * 100;
  }
}

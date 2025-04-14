import { Injectable } from '@nestjs/common';
import { PartialKeywordsCountService } from '../../application/ports/partial-keywords-count.service';
import * as cheerio from 'cheerio';
import { extractTextFromHtml } from '../utils/extract-text-from-html';
import { extractClearWords } from '../utils/extract-clear-words';
import { HtmlToTextOptions } from 'html-to-text';

@Injectable()
export class AppPartialKeywordsCountService
  implements PartialKeywordsCountService
{
  h1PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h1');
  }

  h2PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h2');
  }

  h3PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h3');
  }

  h4PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h4');
  }

  h5PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h5');
  }

  h6PartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'h6');
  }

  pPartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'p');
  }

  strongPartialKeywordsCount(html: string, phrase: string): number {
    const result1 = this.getPartialKeywordsCountByTag(html, phrase, 'strong');
    const result2 = this.getPartialKeywordsCountByTag(html, phrase, 'b');
    return result1 + result2;
  }

  imgAltPartialKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const partials = this.getPartialsFromPhrase(phrase);
    if (!partials.length) return 0;
    const $ = cheerio.load(html);
    const elements = $('img[alt]:not([alt=""])');
    if (!elements) return 0;
    let words: string[] = [];
    elements.map((_, element) => {
      const _element = $(element);
      const text = _element.attr('alt');
      words = [
        ...words,
        ...extractClearWords(text).map((w) => w.toLowerCase()),
      ];
    });

    return this.count(words, partials);
  }

  titlePartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'title');
  }

  metaDescriptionPartialKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const partials = this.getPartialsFromPhrase(phrase);
    if (!partials.length) return 0;
    const $ = cheerio.load(html);
    const elements = $('meta[name="description"]');
    if (!elements) return 0;
    let words: string[] = [];
    elements.map((_, element) => {
      const _element = $(element);
      const text = _element.attr('content');
      words = [
        ...words,
        ...extractClearWords(text).map((w) => w.toLowerCase()),
      ];
    });

    return this.count(words, partials);
  }

  bodyPartialKeywordsCount(html: string, phrase: string): number {
    return this.getPartialKeywordsCountByTag(html, phrase, 'body', {
      selectors: [
        {
          selector: 'img',
          format: 'skip',
        },
      ],
    });
  }

  private getPartialsFromPhrase(phrase: string): string[] {
    const partials: string[] = [];
    const phraseWords = phrase.split(' ');
    for (const phrWord of phraseWords) {
      if (phrWord.length >= 3) {
        partials.push(phrWord.toLowerCase().substring(0, 3));
      }
    }
    return partials;
  }

  private getPartialKeywordsCountByTag(
    html: string,
    phrase: string,
    tag: string,
    options: HtmlToTextOptions = {},
  ) {
    if (!html || html === '' || html === ' ') return 0;
    const partials = this.getPartialsFromPhrase(phrase);
    if (!partials.length) return 0;
    const $ = cheerio.load(html);
    const elements = $(tag);
    if (!elements) return 0;
    let words: string[] = [];
    elements.map((_, element) => {
      const _element = $(element);
      const text = extractTextFromHtml(_element.html(), options);
      words = [
        ...words,
        ...extractClearWords(text).map((w) => w.toLowerCase()),
      ];
    });

    return this.count(words, partials);
  }

  private count(words: string[], partials: string[]) {
    let counter = 0;

    for (const word of words) {
      if (word.length < 3) continue;
      const _partial = word.substring(0, 3);
      for (const partial of partials) {
        if (partial === _partial) counter++;
      }
    }

    return counter;
  }
}

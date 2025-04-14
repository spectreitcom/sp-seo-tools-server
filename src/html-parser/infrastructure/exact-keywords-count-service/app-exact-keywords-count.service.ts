import { Injectable } from '@nestjs/common';
import { ExactKeywordsCountService } from '../../application/ports/exact-keywords-count.service';
import * as cheerio from 'cheerio';
import { extractTextFromHtml } from '../utils/extract-text-from-html';
import { extractClearWords } from '../utils/extract-clear-words';

@Injectable()
export class AppExactKeywordsCountService implements ExactKeywordsCountService {
  h1ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h1');
  }

  h2ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h2');
  }

  h3ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h3');
  }

  h4ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h4');
  }

  h5ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h5');
  }

  h6ExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'h6');
  }

  pExactKeywordsCount(html: string, phrase: string): number {
    return this.getExactKeywordCountByTag(html, phrase, 'p');
  }

  strongExactKeywordsCount(html: string, phrase: string): number {
    const res1 = this.getExactKeywordCountByTag(html, phrase, 'strong');
    const res2 = this.getExactKeywordCountByTag(html, phrase, 'b');
    return res1 + res2;
  }

  imgAltExactKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('img[alt]:not([alt=""])');
    if (!elements) return 0;
    const texts: string[] = [];
    elements.map((_, element) => {
      const _element = $(element);
      texts.push(_element.attr('alt'));
    });
    return this.getExactKeywordsCountFromText(texts.join(' '), phrase);
  }

  titleExactKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const title = $('title');
    if (!title) return 0;
    const text = title.text().toLowerCase();
    const _phrase = phrase.toLowerCase();
    const regExp = new RegExp(`${_phrase}`, 'gim');
    return text.match(regExp).length;
  }

  metaDescriptionExactKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const metaDescription = $('meta[name="description"]');
    if (!metaDescription) return 0;
    const text = metaDescription.attr('content');
    const _phrase = phrase.toLowerCase();
    const regExp = new RegExp(`${_phrase}`, 'gim');
    return text.match(regExp).length;
  }

  bodyExactKeywordsCount(html: string, phrase: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('body');
    if (!elements) return 0;
    const texts: string[] = [];

    elements.map((_, element) => {
      const _element = $(element);
      texts.push(
        extractTextFromHtml(_element.html(), {
          selectors: [
            {
              selector: 'img',
              format: 'skip',
            },
          ],
        }),
      );
    });

    return this.getExactKeywordsCountFromText(texts.join(' '), phrase);
  }

  private getExactKeywordCountByTag(html: string, phrase: string, tag: string) {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $(tag);
    if (!elements) return 0;
    const texts: string[] = [];
    elements.map((_, element) => {
      const _element = $(element);
      texts.push(extractTextFromHtml(_element.html()));
    });
    return this.getExactKeywordsCountFromText(texts.join(' '), phrase);
  }

  private getExactKeywordsCountFromText(text: string, phrase: string) {
    const _text = extractClearWords(text.toLowerCase()).join(' ');
    const _phrase = phrase.toLowerCase();
    const regExp = new RegExp(`${_phrase}`, 'gim');
    return _text.match(regExp).length;
  }
}

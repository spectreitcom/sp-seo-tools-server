import { Injectable } from '@nestjs/common';
import { WordsCountService } from '../../application/ports/words-count.service';
import * as cheerio from 'cheerio';
import { extractTextFromString } from '../utils/extract-text-from-string';

@Injectable()
export class AppWordsCountService implements WordsCountService {
  h1WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h1');
  }

  h2WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h2');
  }

  h3WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h3');
  }

  h4WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h4');
  }

  h5WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h5');
  }

  h6WordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'h6');
  }

  pWordsCount(html: string): number {
    return this.getWordsCountByTag(html, 'p');
  }

  strongWordsCount(html: string): number {
    const result = this.getWordsCountByTag(html, 'strong');
    const result2 = this.getWordsCountByTag(html, 'b');
    return result + result2;
  }

  imgAltWordsCount(html: string): number {
    const $ = cheerio.load(html);
    const imageElements = $('img[alt]:not([alt=""])');
    if (!imageElements) return 0;
    const texts: string[] = [];
    imageElements.map((_, element) => {
      const image = $(element);
      texts.push(image.attr('alt'));
    });
    return this.getWordsCount(texts.join(' '));
  }

  titleWordsCount(html: string): number {
    const $ = cheerio.load(html);
    const titleElement = $('title');
    if (!titleElement) return 0;
    const titleText = titleElement.text();
    return this.getWordsCount(titleText);
  }

  metaDescriptionWordsCount(html: string): number {
    const $ = cheerio.load(html);
    const metaDescriptionElement = $('meta[name="description"]');
    if (!metaDescriptionElement) return 0;
    const metaDescriptionText = metaDescriptionElement.attr('content');
    if (!metaDescriptionText) return 0;
    return this.getWordsCount(metaDescriptionText);
  }

  bodyWordsCount(html: string): number {
    const $ = cheerio.load(html);
    const bodyElement = $('body');
    const text = extractTextFromString(bodyElement.html(), {
      selectors: [
        {
          selector: 'img',
          format: 'skip',
        },
      ],
    });
    return this.getWordsCount(text);
  }

  private getWordsCountByTag(html: string, tag: string) {
    const $ = cheerio.load(html);
    const elements = $(tag);
    if (!elements) return 0;
    const texts: string[] = [];
    elements.map((_, element) => {
      const text = extractTextFromString($(element).html());
      texts.push(text);
    });
    return this.getWordsCount(texts.join(' '));
  }

  private getWordsCount(text: string) {
    return text
      .replace(/\W/g, ' ')
      .split(' ')
      .filter((item) => item !== ' ')
      .filter((item) => item !== '')
      .filter((item) => item !== '&nbsp;')
      .filter((item) => item !== '&nbsp').length;
  }
}

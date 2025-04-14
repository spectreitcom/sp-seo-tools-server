import { Injectable } from '@nestjs/common';
import { ElementsCountService } from '../../application/ports/elements-count.service';
import * as cheerio from 'cheerio';

@Injectable()
export class AppElementsCountService implements ElementsCountService {
  private getElementsCountByTag(html: string, tag: string) {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $(tag);
    return elements.length;
  }

  h1ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h1');
  }

  h2ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h2');
  }

  h3ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h3');
  }

  h4ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h4');
  }

  h5ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h5');
  }

  h6ElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'h6');
  }

  pElementsCount(html: string): number {
    return this.getElementsCountByTag(html, 'p');
  }

  strongElementsCount(html: string): number {
    // const $ = cheerio.load(html);
    // const strongElements = $('strong');
    // const bElements = $('b');
    // return strongElements.length + bElements.length;
    const result1 = this.getElementsCountByTag(html, 'strong');
    const result2 = this.getElementsCountByTag(html, 'b');
    return result1 + result2;
  }

  linkElementsCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('a');
    return elements.length;
  }

  linkNofollowElementsCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('a[rel="nofollow"]');
    return elements.length;
  }

  linkDofollowElementsCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('a:not([rel="nofollow"])');
    return elements.length;
  }

  imageElementsCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $('img');
    return elements.length;
  }

  imageElementsWithAltCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elementsWithAlt = $('img[alt]:not([alt=""])');
    return elementsWithAlt.length;
  }

  imageElementsWithoutOrWithEmptyAltCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elementsWithoutAlt = $('img:not([alt])');
    const elementsWithEmptyAlt = $('img[alt=""]');
    return elementsWithoutAlt.length + elementsWithEmptyAlt.length;
  }
}

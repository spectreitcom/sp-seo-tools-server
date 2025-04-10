import { Injectable } from '@nestjs/common';
import { ElementsCountService } from '../../application/ports/elements-count.service';
import * as cheerio from 'cheerio';

@Injectable()
export class AppElementsCountService implements ElementsCountService {
  h1ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h1');
    return elements.length;
  }

  h2ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h2');
    return elements.length;
  }

  h3ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h3');
    return elements.length;
  }

  h4ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h4');
    return elements.length;
  }

  h5ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h5');
    return elements.length;
  }

  h6ElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('h6');
    return elements.length;
  }

  pElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('p');
    return elements.length;
  }

  strongElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const strongElements = $('strong');
    const bElements = $('b');
    return strongElements.length + bElements.length;
  }

  linkElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('a');
    return elements.length;
  }

  linkNofollowElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('a[rel="nofollow"]');
    return elements.length;
  }

  linkDofollowElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('a:not([rel="nofollow"])');
    return elements.length;
  }

  imageElementsCount(html: string): number {
    const $ = cheerio.load(html);
    const elements = $('img');
    return elements.length;
  }

  imageElementsWithAltCount(html: string): number {
    const $ = cheerio.load(html);
    const elementsWithAlt = $('img[alt]:not([alt=""])');
    return elementsWithAlt.length;
  }

  imageElementsWithoutOrWithEmptyAltCount(html: string): number {
    const $ = cheerio.load(html);
    const elementsWithoutAlt = $('img:not([alt])');
    const elementsWithEmptyAlt = $('img[alt=""]');
    return elementsWithoutAlt.length + elementsWithEmptyAlt.length;
  }
}

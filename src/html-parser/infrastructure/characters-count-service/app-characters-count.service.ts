import { Injectable } from '@nestjs/common';
import { CharactersCountService } from '../../application/ports/characters-count.service';
import * as cheerio from 'cheerio';
import { extractTextFromHtml } from '../utils/extract-text-from-html';

@Injectable()
export class AppCharactersCountService implements CharactersCountService {
  private countCharacters(html: string, tag: string) {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const elements = $(tag);
    if (!elements.length) return 0;

    const texts: string[] = [];

    elements.map((_, element) => {
      const text = extractTextFromHtml($(element).html());
      texts.push(text);
    });

    return texts.join(' ').replace(/\W/g, '').length;
  }

  h1CharactersCount(html: string): number {
    return this.countCharacters(html, 'h1');
  }

  h2CharactersCount(html: string): number {
    return this.countCharacters(html, 'h2');
  }

  h3CharactersCount(html: string): number {
    return this.countCharacters(html, 'h3');
  }

  h4CharactersCount(html: string): number {
    return this.countCharacters(html, 'h4');
  }

  h5CharactersCount(html: string): number {
    return this.countCharacters(html, 'h5');
  }

  h6CharactersCount(html: string): number {
    return this.countCharacters(html, 'h6');
  }

  pCharactersCount(html: string): number {
    return this.countCharacters(html, 'p');
  }

  strongCharactersCount(html: string): number {
    const result = this.countCharacters(html, 'strong');
    const result2 = this.countCharacters(html, 'b');
    return result + result2;
  }

  imgAltCharactersCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const imgElements = $('img[alt]:not([alt=""])');

    const texts: string[] = [];

    imgElements.each((_, element) => {
      const altText = $(element).attr('alt');
      texts.push(altText);
    });

    return texts.join(' ').replace(/\W/g, '').length;
  }

  titleCharactersCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const titleElement = $('title');
    if (!titleElement) return 0;
    return titleElement.text().replace(/\W/g, '').length;
  }

  metaDescriptionCharactersCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const metaDescElement = $('meta[name="description"]');
    if (!metaDescElement) return 0;
    return metaDescElement.attr('content').replace(/\W/g, '').length;
  }

  bodyCharactersCount(html: string): number {
    if (!html || html === '' || html === ' ') return 0;
    const $ = cheerio.load(html);
    const bodyHtml = $('body').html();
    const text = extractTextFromHtml(bodyHtml, {
      selectors: [{ selector: 'img', format: 'skip' }],
    });
    return text.replace(/\W/g, '').length;
  }
}

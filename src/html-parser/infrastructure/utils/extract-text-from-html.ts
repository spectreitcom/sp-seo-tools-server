import { convert, HtmlToTextOptions } from 'html-to-text';

/**
 * @param html - should be a html structure
 * @param options
 */
export function extractTextFromHtml(
  html: string,
  options: HtmlToTextOptions = {},
) {
  return convert(html, options);
}

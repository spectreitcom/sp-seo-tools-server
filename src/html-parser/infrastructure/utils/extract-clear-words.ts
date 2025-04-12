/**
 * @desc Returns escaped tokens
 * @param text
 */
export function extractClearWords(text: string): string[] {
  return text
    .replace(/\\n/gi, ' ')
    .replace(/\\t/gi, ' ')
    .replace(/nbsp;/gi, ' ')
    .replace(/nbsp/gi, ' ')
    .replace(/\W/gi, ' ')
    .split(' ')
    .filter((item) => item !== '')
    .filter((item) => item !== ' ');
}

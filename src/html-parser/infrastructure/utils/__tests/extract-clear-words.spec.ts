import { extractClearWords } from '../extract-clear-words';

describe('extractClearWords', () => {
  it('should extract clear words case 1', () => {
    const text =
      'Lorem ipsum, dolor the \\n best   software house in cracow sit amet.';

    const result = extractClearWords(text);

    expect(result.join(' ')).toBe(
      'Lorem ipsum dolor the best software house in cracow sit amet',
    );
  });

  it('should extract clear words case 2', () => {
    const text =
      'Lorem ipsum, dolor the \\n best &nbsp; software house in cracow sit amet.';

    const result = extractClearWords(text);

    expect(result.join(' ')).toBe(
      'Lorem ipsum dolor the best software house in cracow sit amet',
    );
  });
});

import { objectTokenizer } from './object-tokenizer';

describe('ObjectTokenizer', () => {
  it('should return a string', () => {
    const object = {
      a: 1,
      b: '2',
      d: true
    };

    const stringifier = objectTokenizer<typeof object>()
      .token('a', (value) => `${value + 1}`)
      .token('b', (value) => `${parseInt(value) + 2}`)
      .token('d', (value) => String(value))
      ;

    expect(stringifier.exec(object)).toStrictEqual(['2', '4', 'true']);
  });
});

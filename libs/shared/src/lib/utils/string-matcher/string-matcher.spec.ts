import { stringMatcher } from './string-matcher';

describe('StringMatcher', () => {
  it('should match string', () => {
    const numbers: string[] = [];
    const strings: string[] = [];

    const matcher = stringMatcher()
      .match(/^([0-9])/, ([value]) => numbers.push(value))
      .match(/^([a-z])/, ([value]) => strings.push(value));

    matcher.exec('0a1b2c3d4e5f6g7h8i9');
    expect(numbers).toStrictEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    expect(strings).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
  });
});

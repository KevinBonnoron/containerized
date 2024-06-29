import { jsonStreamParser } from './json-stream-parser';

describe('JsonStreamParser', () => {
  it.each([
    { string: '{ "success": true }', expected: { success: true } },
    { string: '{ "success": true, "message": "Ok" }', expected: { success: true, message: 'Ok' } },
  ])('should parse valid json string', ({ string, expected }) => {
    const parser = jsonStreamParser();
    parser.add(string);
    expect(parser.tryParse()).toEqual(expected);
  });

  it.each([
    { strings: ['{ "success"', ': true }'], expected: { success: true } },
    { strings: ['{ "success"', ': true, "mess', 'age": "Ok" }'], expected: { success: true, message: 'Ok' } },
    { strings: '{ "success": true, "message": "Ok" }'.split(''), expected: { success: true, message: 'Ok' } },
  ])('should parse splitted valid json string', ({ strings, expected }) => {
    const parser = jsonStreamParser();
    for (const string of strings) {
      parser.add(string);
    }

    expect(parser.tryParse()).toEqual(expected);
  });
});

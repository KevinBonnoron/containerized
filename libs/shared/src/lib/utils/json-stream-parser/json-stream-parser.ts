export class JsonStreamParser {
  private tryCount = 0;

  constructor(private value: string) {}

  add(value: string) {
    this.value += value;
    return this;
  }

  tryParse() {
    try {
      const json = JSON.parse(this.value);
      this.value = '';
      this.tryCount = 0;
      return json;
    } catch (e) {
      this.tryCount++;
      // Nothing
    }
  }
}

export const jsonStreamParser = (initialValue = '') => new JsonStreamParser(initialValue);

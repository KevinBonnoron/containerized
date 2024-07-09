type Callback = (...value: any[]) => unknown;

interface Matcher {
  regex: RegExp;
  callback: Callback;
}

/**
 * This class is used to parse a string with different regex.
 */
class StringMatcher {
  private readonly matchers: Matcher[] = [];

  match(regex: RegExp, callback: Callback = () => {}) {
    let existingMatcher = this.matchers.find((matcher) => matcher.regex === regex);
    if (existingMatcher === undefined) {
      existingMatcher = { regex, callback };
      this.matchers.push(existingMatcher);
    } else {
      existingMatcher.callback = callback;
    }

    return this;
  }

  /**
   * Run all the matchers against the passed string until either string is completely parsed or no match are found.
   *
   * @param value the string to be checked
   * @returns void
   * @throws Error when no match are found
   */
  exec(value: string) {
    let currentValue = value;
    while (currentValue.length) {
      const lastValue = currentValue;
      for (const { regex, callback } of this.matchers) {
        const matches = currentValue.match(regex);
        if (matches) {
          const result = callback(matches.slice(1));
          if (result === false) {
            break;
          }

          currentValue = currentValue.replace(regex, '');
          break;
        }
      }

      if (lastValue === currentValue) {
        // Infinite loop
        throw new Error(`Non matching case found. Remaining string: ${currentValue}`);
      }
    }
  }

  /**
   * Return the result of the first matched matchers. If no matcher match the string, null is returned.
   * @param value the string to be checked
   * @returns T
   */
  query<T>(value: string): T {
    let result: T = null as T;
    for (const { regex, callback } of this.matchers) {
      const matches = value.match(regex);
      if (matches) {
        result = callback(matches.slice(1)) as T;
        break;
      }
    }

    return result;
  }
}

export const stringMatcher = () => new StringMatcher();

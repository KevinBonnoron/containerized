// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback<V = any> = (value: NonNullable<V>, key: PropertyKey, object: NonNullable<unknown>) => string;

const get = (object: Record<PropertyKey, unknown>, value: string): unknown => {
  const temp = value.split('.');
  const key = temp.shift();
  if (!key) {
    return object;
  }

  return get(object[key] as NonNullable<unknown>, temp.join('.'));
}

class ObjectTokenizer<T> {
  private readonly matchers: Record<PropertyKey, Callback> = {};

  token<K extends keyof T>(path: K, callback: Callback<T[K]>) {
    this.matchers[path] = callback;
    return this;
  }

  exec(object: NonNullable<unknown>) {
    const result = [];
    for (const [key, callback] of Object.entries(this.matchers)) {
      const value = get(object, key);
      if (value !== undefined) {
        result.push(callback(value, key, object));
      }
    }

    return result;
  }
}

export const objectTokenizer = <T>() => new ObjectTokenizer<T>();
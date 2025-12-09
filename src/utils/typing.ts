/**
 * Omits specified keys from an object
 * @param obj The object to omit keys from
 * @param keys The keys to omit
 * @returns The object without the specified keys
 */
export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) delete result[key];
  return result;
}

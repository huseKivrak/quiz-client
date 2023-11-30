export type DataValue = string | number | DataObject | DataArray;
export type DataObject = { [key: string]: DataValue };
export type DataArray = DataObject[];

/**
 * Differently named special variables.
 * {
 * 'api_name': 'clientName'
 * };
 */
const snakeToCamelSpecialCases: { [key: string]: string } = {};

const camelToSnakeSpecialCases = Object.fromEntries(
  Object.entries(snakeToCamelSpecialCases).map(([key, value]) => [value, key])
);

const camelCaseResultsCache: Record<string, string> = {};
const snakeCaseResultsCache: Record<string, string> = {};

export function toCamelCase(str: string): string {
  if (camelCaseResultsCache[str]) return camelCaseResultsCache[str];

  const converted = str.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
  camelCaseResultsCache[str] = converted;
  snakeCaseResultsCache[converted] = str;

  return converted;
}

export function toSnakeCase(str: string): string {
  if (snakeCaseResultsCache[str]) return snakeCaseResultsCache[str];

  const converted = str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  camelCaseResultsCache[converted] = str;
  snakeCaseResultsCache[str] = converted;

  return converted;
}

/**
 *
 * @param input : object or array of objects
 * @param convertedCase : 'camel' or 'snake'
 * @returns : object or array of objects with keys converted to the specified case
 */
function transformObjectOrArrayKeys(
  input: DataArray | DataObject,
  convertedCase: 'camel' | 'snake' = 'camel'
): DataValue {
  if (Array.isArray(input)) {
    return input.map((item) => transformObjectOrArrayKeys(item, convertedCase) as DataObject);
  } else if (typeof input === 'object' && input !== null) {
    const newObj: DataObject = {};
    for (const [key, val] of Object.entries(input)) {
      const newKey =
        convertedCase === 'camel'
          ? snakeToCamelSpecialCases[key] || toCamelCase(key)
          : camelToSnakeSpecialCases[key] || toSnakeCase(key);

      if (typeof val === 'object') {
        newObj[newKey] = transformObjectOrArrayKeys(val, convertedCase);
      } else {
        newObj[newKey] = val;
      }
    }
    return newObj;
  }
  return input;
}

export function deepTransformKeys(
  input: DataObject | DataArray | string | number,
  convertedCase: 'camel' | 'snake' = 'camel'
): DataObject | DataArray | string | number {
  if (typeof input === 'object') return transformObjectOrArrayKeys(input, convertedCase);

  return input;
}

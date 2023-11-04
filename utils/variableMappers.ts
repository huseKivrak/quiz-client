export type DataValue = string | number | DataObject | DataObject[];
export type DataObject = { [key: string]: DataValue };

export function deepTransformKeys(
  input: DataValue,
  convertedCase: "camel" | "snake" = "camel"
): DataValue {
  if (typeof input === "object")
    return transformObjectOrArrayKeys(input, convertedCase);

  return input;
}

/**
 *
 * @param input : object or array of objects
 * @param convertedCase : 'camel' or 'snake'
 * @returns : object or array of objects with keys converted to the specified case
 */
function transformObjectOrArrayKeys(
  input: DataObject[] | DataObject,
  convertedCase: "camel" | "snake" = "camel"
): DataValue {
  if (Array.isArray(input)) {
    return input.map(
      (item) => transformObjectOrArrayKeys(item, convertedCase) as DataObject
    );
  } else if (typeof input === "object" && input !== null) {
    const newObj: DataObject = {};
    for (const [key, val] of Object.entries(input)) {
      const newKey =
        convertedCase === "camel"
          ? apiKeysRecord[key] || toCamelCase(key)
          : clientKeysRecord[key] || toSnakeCase(key);

      if (typeof val === "object") {
        newObj[newKey] = transformObjectOrArrayKeys(val, convertedCase);
      } else {
        newObj[newKey] = val;
      }
    }
    return newObj;
  }
  return input;
}

/**
 * Differently named special variables.
 * {
 * 'api_name': 'clientName'
 * };
 */

type KeysRecord = Record<string, string>;

const apiKeysRecord: KeysRecord = {
  pk: "id",
};

const clientKeysRecord: KeysRecord = Object.fromEntries(
  Object.entries(apiKeysRecord).map(([key, value]) => [value, key])
);

const camelCaseResultsCache: Record<string, string> = {};
const snakeCaseResultsCache: Record<string, string> = {};

function toCamelCase(str: string): string {
  if (camelCaseResultsCache[str]) return camelCaseResultsCache[str];

  const converted = str.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
  camelCaseResultsCache[str] = converted;
  snakeCaseResultsCache[converted] = str;

  return converted;
}

function toSnakeCase(str: string): string {
  if (snakeCaseResultsCache[str]) return snakeCaseResultsCache[str];

  const converted = str.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );
  camelCaseResultsCache[converted] = str;
  snakeCaseResultsCache[str] = converted;

  return converted;
}

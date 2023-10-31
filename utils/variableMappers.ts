export type DataType = { [key: string]: string | number | DataType[] };

/**
 Special conversions
 {
  api value : 'front-end value'
 }
 */


const varDict: { [key: string]: string } = {
  pk: 'id',
};

const camelCaseCache: Record<string, string> = {};

export function convertToCamelCase(str: string): string {
  const lowerStr = str.toLowerCase();
  if (camelCaseCache[lowerStr]) return camelCaseCache[lowerStr];

  const converted = lowerStr.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());
  camelCaseCache[lowerStr] = converted;

  return converted;
}

export function transformKeys(obj: DataType): DataType {
  const newObj: DataType = {};

  for (const [key, val] of Object.entries(obj)) {
    const newKey = varDict[key] || convertToCamelCase(key);

    if (Array.isArray(val)) {
      newObj[newKey] = camelCaseMapper(val as DataType[]) as DataType[];
    } else if (typeof val === 'string') {
      newObj[newKey] = val;
    }
  }

  return newObj;
}

export default function camelCaseMapper(
  data: DataType | DataType[]
): DataType | DataType[] {
  if (Array.isArray(data)) {
    return data.map((singleData) => transformKeys(singleData));
  } else {
    return transformKeys(data);
  }
}

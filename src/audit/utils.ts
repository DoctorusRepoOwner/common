function isSystemField(key: string): boolean {
  const systemFields = ['updatedAt', 'lastModified', 'modifiedAt', 'lastUpdated', 'version', 'etag', 'ttl'];
  return systemFields.includes(key);
}

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

function calculateDifferences(
  oldData: Record<string, any>,
  newData: Record<string, any>,
): {
  added?: Record<string, any>;
  modified?: Record<string, { from: any; to: any }>;
  removed?: Record<string, any>;
} {
  const added: Record<string, any> = {};
  const modified: Record<string, { from: any; to: any }> = {};
  const removed: Record<string, any> = {};

  const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

  for (const key of allKeys) {
    if (isSystemField(key)) continue;

    const oldValue = oldData[key];
    const newValue = newData[key];

    if (!(key in oldData) && key in newData) {
      added[key] = newValue;
    } else if (key in oldData && !(key in newData)) {
      removed[key] = oldValue;
    } else if (key in oldData && key in newData && !deepEqual(oldValue, newValue)) {
      modified[key] = { from: oldValue, to: newValue };
    }
  }

  const result: ReturnType<typeof calculateDifferences> = {};
  if (Object.keys(added).length > 0) result.added = added;
  if (Object.keys(modified).length > 0) result.modified = modified;
  if (Object.keys(removed).length > 0) result.removed = removed;

  return result;
}

export function calculateChangedData(
  newData?: Record<string, any> | null,
  oldData?: Record<string, any> | null,
): {
  added?: Record<string, any>;
  modified?: Record<string, { from: any; to: any }>;
  removed?: Record<string, any>;
  full?: Record<string, any>;
} {
  if (!oldData && newData) return { full: newData };
  if (!newData && oldData) return { full: oldData };
  if (oldData && newData) {
    return {
      ...calculateDifferences(oldData, newData),
      full: newData,
    };
  }
  return { full: newData || oldData || {} };
}

export function changedDataIncludesField(
  changedData: ReturnType<typeof calculateChangedData>,
  fieldName: string,
): boolean {
  if (!changedData) return false;
  const { added, modified, removed } = changedData;
  return (
    (added && fieldName in added) || (modified && fieldName in modified) || (removed && fieldName in removed) || false
  );
}

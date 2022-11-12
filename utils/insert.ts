export function insert(arr: any[], index: number, newItem: any) {
  if (!arr?.length) return null;
  if (Array.isArray(newItem)) {
    return [...arr.slice(0, index), ...newItem, ...arr.slice(index)];
  }
  return [...arr.slice(0, index), newItem, ...arr.slice(index)];
}

export function sortFilterKeys(arr: string[]) {
  if (!arr?.length) return null;
  return ([arr[2], arr[3]] = [arr[0], arr[1], arr[3], arr[2]]);
}

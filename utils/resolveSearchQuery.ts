import qs from "qs";

export function parseSearchQuery<T>(search: string): T {
  if (!search) {
    return {} as T;
  }

  return qs.parse(search.split("?")[1]) as any;
}

export function stringifySearchQuery(search: Record<string, string>[]) {
  if (!search || !Object.keys(search)?.length) {
    return "";
  }

  return qs.stringify(search);
}

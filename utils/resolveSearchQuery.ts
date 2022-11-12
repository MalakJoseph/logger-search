import qs from "qs";

export function stringifySearchQuery(search: Record<string, string>[]) {
  if (!search || !Object.keys(search)?.length) {
    return "";
  }

  return qs.stringify(search);
}

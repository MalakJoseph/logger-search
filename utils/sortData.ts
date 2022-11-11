import { PickedDataKeys } from "../interfaces";

export type SortMode = "ASC" | "DESC" | "DEFAULT";

export function sortData(key: PickedDataKeys, mode?: SortMode) {
  return function (a, b) {
    const dynamicA = a[key];
    const dynamicB = b[key];

    if (dynamicA === null) {
      return 1;
    }
    if (dynamicB === null) {
      return -1;
    }

    if (mode === "ASC") {
      return dynamicA < dynamicB ? -1 : 1;
    }

    if (mode === "DESC") {
      return dynamicA < dynamicB ? 1 : -1;
    }
    return 0;
  };
}

import { ParsedUrlQuery } from "querystring";
import {
  AuditLog,
  FilterKeys,
  PickedDataKeys,
  PickedDataKeysType,
  PickedLogs,
} from "../../interfaces";
import { isInDateRange, sortData, SortMode } from "../../utils";

type DataMapperProps = {
  data: AuditLog[];
  currentPage: number;
  logsPerPage: number;
  mode: SortMode;
  activeKey: PickedDataKeysType;
  query: ParsedUrlQuery;
};

export function dataMapper({
  data,
  currentPage,
  logsPerPage,
  mode,
  activeKey,
  query,
}: DataMapperProps): { pickedLogs: PickedLogs; totalCount: number } {
  const isFilters = Object.keys(query).length !== 0;
  const filteredData = isFilters ? filterData(data, query) : data;
  const sortedData = filteredData.sort(sortData(activeKey, mode));
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const singleRowData = sortedData.slice(indexOfFirstLog, indexOfLastLog);
  const pickedLogs = singleRowData.map((log) => ({
    logId: log.logId,
    applicationType: log.applicationType,
    applicationId: log.applicationId,
    actionType: log.actionType,
    logInfo: log.logInfo,
    creationTimestamp: log.creationTimestamp,
  }));
  const totalCount = filteredData.length;

  return { pickedLogs, totalCount };
}

function filterData(data: AuditLog[], query: ParsedUrlQuery) {
  const queriedKeys = Object.keys(query) as FilterKeys[];
  const store: AuditLog[] = [];

  data?.forEach((log) => {
    queriedKeys?.forEach((key) => {
      if (key === "toDate") return;

      if (key === "fromDate") {
        if (
          isInDateRange(
            log["creationTimestamp"],
            query["fromDate"] as string,
            query["toDate"] as string
          )
        ) {
          store.push(log);
        }
        return;
      }

      const suitedQueryValue =
        typeof log[key] === "number" ? +query[key] : query[key];
      const isNewLog =
        store.findIndex((cachedLog) => +cachedLog.logId === log.logId) === -1;

      if (log[key] === suitedQueryValue && isNewLog) {
        store.push({
          ...log,
          [key]: query[key],
        });
      }
    });
  });

  const purgedStore = store?.filter((log) => {
    let validator: boolean[] = [];

    queriedKeys.forEach((key) => {
      let pass = false;

      if (key === "toDate") return;

      if (key === "fromDate") {
        if (
          isInDateRange(
            log[PickedDataKeys.creationTimestamp],
            query["fromDate"] as string,
            query["toDate"] as string
          )
        ) {
          pass = true;
        }
      }

      if (pass || log[key] === query[key]) {
        validator.push(true);
        return;
      }

      validator.push(false);
    });

    return validator.every((value) => value === true);
  });

  return purgedStore;
}

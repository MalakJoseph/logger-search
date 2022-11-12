import { ParsedUrlQuery } from "querystring";
import {
  AuditLog,
  FilterKeys,
  PickedDataKeysType,
  PickedLogs,
} from "../../../interfaces";
import { sortData, SortMode } from "../../../utils";

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
}: DataMapperProps): PickedLogs {
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

  return pickedLogs;
}

function filterData(data: AuditLog[], query: ParsedUrlQuery) {
  const queriedKeys = Object.keys(query) as FilterKeys[];
  const store: AuditLog[] = [];

  data?.forEach((log) => {
    queriedKeys?.forEach((key) => {
      const suitedQueryKey =
        typeof log[key] === "number" ? +query[key] : query[key];
      const isNewLog =
        store.findIndex((cachedLog) => +cachedLog.logId === log.logId) === -1;

      if (log[key] === suitedQueryKey && isNewLog) {
        store.push({
          ...log,
          [key]: query[key],
        });
      }
    });
  });

  return store;
}

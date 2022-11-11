import { AuditLog, PickedDataKeys, PickedLogs } from "../../../interfaces";
import { sortData, SortMode } from "../../../utils";

type DataMapperProps = {
  data: AuditLog[];
  currentPage: number;
  logsPerPage: number;
  mode: SortMode;
  activeKey: PickedDataKeys;
};

export function dataMapper({
  data,
  currentPage,
  logsPerPage,
  mode,
  activeKey,
}: DataMapperProps): PickedLogs {
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const sortedData = data.sort(sortData(activeKey, mode));
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

import { AuditLog } from "../../../interfaces";

export function dataMapper(
  data: AuditLog[],
  currentPage: number,
  logsPerPage: number
) {
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const singleRowData = data.slice(indexOfFirstLog, indexOfLastLog);
  const pickedData = singleRowData.map((log) => ({
    logId: log.logId,
    applicationType: log.applicationType,
    applicationId: log.applicationId,
    actionType: log.actionType,
    logInfo: log.logInfo,
    creationTimestamp: log.creationTimestamp,
  }));

  return pickedData;
}

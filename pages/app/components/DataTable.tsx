import { useState, useEffect } from "react";
import { AuditLog, PickedDataKeys, PickedLogs } from "../../../interfaces";
import { dataMapper } from "../helpers";
import { ChevronUp } from "../assets/icons/ChevronUp";
import { capitalizeString, SortMode } from "../../../utils";

interface DataTableProps {
  data: AuditLog[];
  currentPage: number;
  logsPerPage: number;
}

const DataTable = ({ data, currentPage, logsPerPage }: DataTableProps) => {
  const [formattedData, setFormattedData] = useState<PickedLogs>();
  const [activeKey, setActiveKey] = useState<PickedDataKeys>("logId");
  const [sortMode, setSortMode] = useState<SortMode>("DEFAULT");

  useEffect(() => {
    setFormattedData(
      dataMapper({
        data: data,
        currentPage: currentPage,
        logsPerPage: logsPerPage,
        activeKey: activeKey,
        mode: sortMode,
      })
    );
  }, [data, currentPage, activeKey, sortMode]);

  const sortColumn = (key: PickedDataKeys) => {
    const toggledMode =
      sortMode === "ASC" ? "DESC" : sortMode === "DESC" ? "ASC" : "DESC";

    if (key === activeKey) {
      setSortMode(toggledMode);
      return;
    }
    setSortMode("DESC");
  };

  const dataKeys =
    formattedData && (Object.keys(formattedData[0]) as PickedDataKeys[]);

  return (
    <table className="table p-4 my-5 w-full bg-white shadow rounded-lg text-sm">
      <thead>
        <tr>
          {dataKeys?.map((key) => (
            <th
              key={key}
              className="text-left border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-medium text-gray-900"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setActiveKey(key);
                  sortColumn(key);
                }}
              >
                {capitalizeString(key)}
                {activeKey === key && sortMode !== "DEFAULT" && (
                  <ChevronUp
                    rotate={sortMode === "ASC" ? "Up" : "Down"}
                    className="ml-1"
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formattedData?.map((log) => (
          <tr key={log.logId} className="text-gray-700">
            {dataKeys?.map((key) => (
              <td
                key={`${key}-${log.logId}`}
                className="border-b-2 p-4 dark:border-dark-5"
              >
                {log[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

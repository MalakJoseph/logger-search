import { Dispatch, SetStateAction } from "react";
import { PickedDataKeys, PickedLogs } from "../../../interfaces";
import { ChevronUp } from "../assets/icons/ChevronUp";
import { capitalizeString, SortMode } from "../../../utils";

interface DataTableProps {
  formattedData: PickedLogs;
  dataKeys: PickedDataKeys[];
  activeKey: PickedDataKeys;
  setActiveKey: Dispatch<SetStateAction<PickedDataKeys>>;
  sortMode: SortMode;
  setSortMode: Dispatch<SetStateAction<SortMode>>;
}

const DataTable = ({
  formattedData,
  dataKeys,
  activeKey,
  setActiveKey,
  sortMode,
  setSortMode,
}: DataTableProps) => {
  const sortColumn = (key: PickedDataKeys) => {
    const toggledMode = sortMode === "DESC" ? "ASC" : "DESC";
    // sortMode === "ASC" ? "DESC" : sortMode === "DESC" ? "ASC" : "DESC";

    if (key === activeKey) {
      setSortMode(toggledMode);
      return;
    }
    setSortMode("DESC");
  };

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

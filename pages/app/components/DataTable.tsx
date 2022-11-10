import { AuditLog } from "../../../interfaces";
import { dataMapper } from "../helpers";
import { capitalizeString } from "../../../utils/capitalizeString";
import { ChevronUp } from "../assets/icons/ChevronUp";

interface DataTableProps {
  data: AuditLog[];
  currentPage: number;
  logsPerPage: number;
}

const DataTable = ({ data, currentPage, logsPerPage }: DataTableProps) => {
  const formattedData = dataMapper(data, currentPage, logsPerPage);
  const dataKeys = Object.keys(formattedData[0]);

  return (
    <table className="table p-4 my-5 w-full bg-white shadow rounded-lg text-sm">
      <thead>
        <tr>
          {dataKeys.map((key) => (
            <th
              key={key}
              className="text-left border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-medium text-gray-900"
            >
              <div className="flex items-center">
                {capitalizeString(key)}{" "}
                <button>
                  <ChevronUp />
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formattedData.map((log) => (
          <tr key={log.logId} className="text-gray-700">
            {dataKeys.map((key) => (
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

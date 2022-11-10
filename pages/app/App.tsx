import { useState } from "react";
import Layout from "./components/Layout";
import Pagination from "./components/Pagination";
import { ChevronUp } from "./assets/icons/ChevronUp";
import { dataMapper } from "./helpers";
import { AuditLog } from "../../interfaces";
import { capitalizeString } from "../../utils/capitalizeString";

interface AppProps {
  data: AuditLog[];
}

const logsPerPage = 10;

const App = ({ data }: AppProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const formattedData = dataMapper(data, currentPage, logsPerPage);
  const dataKeys = Object.keys(formattedData[0]);

  return (
    <Layout>
      <h1 className="flex justify-center text-slate-700 red font-bold bg-red-300">
        Hello Next.js 👋
      </h1>

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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        logsPerPage={logsPerPage}
        totalCount={data.length}
      />
    </Layout>
  );
};

export default App;

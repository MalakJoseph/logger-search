import { AuditLog } from "../../interfaces";
import { ChevronUp } from "./assets/icons/ChevronUp";
import Layout from "./components/Layout";
import { capitalizeString } from "./helpers";

interface AppProps {
  data: AuditLog[];
}

const App = ({ data }: AppProps) => {
  const formattedData = data.slice(0, 20);
  const pickedData = formattedData.map((log) => ({
    logId: log.logId,
    applicationType: log.applicationType,
    applicationId: log.applicationId,
    actionType: log.actionType,
    creationTimestamp: log.creationTimestamp,
  }));
  const pickedDataKeys = Object.keys(pickedData[0]);

  console.log(pickedDataKeys);

  return (
    <Layout>
      <h1 className="flex justify-center text-slate-700 red font-bold bg-red-300">
        Hello Next.js 👋
      </h1>

      <table className="table p-4 my-5 w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            {pickedDataKeys.map((key, i) => (
              <th
                key={key + i}
                className="text-left border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"
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
          {pickedData.map((log) => (
            <tr className="text-gray-700">
              {pickedDataKeys.map((key) => (
                <td className="border-b-2 p-4 dark:border-dark-5">
                  {log[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default App;

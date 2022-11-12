import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../src/components/Layout";
import Pagination from "../src/components/Pagination";
import DataTable from "../src/components/DataTable";
import Filters from "../src/components/Filters";
import { dataMapper, sortFilterKeys } from "../src/helpers";
import {
  AuditLog,
  PickedDataKeys,
  PickedDataKeysType,
  PickedLogs,
  FilterKeys,
} from "../interfaces";
import { insert, SortMode } from "../utils";
import { InfoIcon } from "../src/assets/icons";

interface AppProps {
  data: AuditLog[];
}

const logsPerPage = 10;

const App = ({ data }: AppProps) => {
  const { push, query } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [formattedData, setFormattedData] = useState<PickedLogs>();
  const [totalCount, setTotalCount] = useState<number>(data?.length);
  const [activeKey, setActiveKey] = useState<PickedDataKeysType>(
    PickedDataKeys.logId
  );
  const [sortMode, setSortMode] = useState<SortMode>("DEFAULT");

  useEffect(() => {
    const { pickedLogs, totalCount } = dataMapper({
      data,
      currentPage,
      logsPerPage,
      activeKey,
      mode: sortMode,
      query,
    });
    setFormattedData(pickedLogs);
    setTotalCount(totalCount);
  }, [data, currentPage, activeKey, sortMode, query]);

  if (!formattedData?.length) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div
            className="container mb-2 rounded-lg bg-blue-500 flex items-center text-white text-sm font-bold px-4 py-3 relative"
            role="alert"
          >
            <InfoIcon />
            <p>No found data!!</p>
          </div>
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
            onClick={() => push("/")}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const dataKeys =
    formattedData && (Object.keys(formattedData[0]) as PickedDataKeysType[]);

  const filterKeys = extractFilterKeys(dataKeys);
  const actionTypeOptions = Array.from(
    new Set(data?.map((log) => log.actionType))
  ).filter((option) => option !== null);
  const applicationTypeOptions = Array.from(
    new Set(data?.map((log) => log.applicationType))
  ).filter((option) => option !== null);

  return (
    <Layout>
      <Filters
        filterKeys={filterKeys}
        actionTypeOptions={actionTypeOptions}
        applicationTypeOptions={applicationTypeOptions}
        query={query}
      />
      <DataTable
        formattedData={formattedData}
        dataKeys={dataKeys}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        logsPerPage={logsPerPage}
        totalCount={totalCount}
      />
    </Layout>
  );
};

export default App;

function extractFilterKeys(oldKeys: PickedDataKeysType[]) {
  const filteredKeys = oldKeys
    ?.filter((key) => key !== PickedDataKeys.logInfo)
    .filter((key) => key !== PickedDataKeys.creationTimestamp);

  const sortedFilterKeys = sortFilterKeys(filteredKeys);

  const newKeys: FilterKeys[] = insert(
    sortedFilterKeys,
    sortedFilterKeys?.length - 1,
    ["fromDate", "toDate"]
  );

  return newKeys;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import Pagination from "./components/Pagination";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";
import { dataMapper, sortFilterKeys } from "./helpers";
import {
  AuditLog,
  PickedDataKeys,
  PickedDataKeysType,
  PickedLogs,
  FilterKeys,
} from "../../interfaces";
import { insert, SortMode } from "../../utils";

interface AppProps {
  data: AuditLog[];
}

const logsPerPage = 10;

const App = ({ data }: AppProps) => {
  const { query } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [formattedData, setFormattedData] = useState<PickedLogs>();
  const [activeKey, setActiveKey] = useState<PickedDataKeysType>(
    PickedDataKeys.logId
  );
  const [sortMode, setSortMode] = useState<SortMode>("DEFAULT");

  useEffect(() => {
    setFormattedData(
      dataMapper({
        data,
        currentPage,
        logsPerPage,
        activeKey,
        mode: sortMode,
        query,
      })
    );
  }, [data, currentPage, activeKey, sortMode, query]);

  if (!formattedData?.length) {
    return "No found data!!";
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
        totalCount={data.length}
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
    ["fromData", "toData"]
  );

  return newKeys;
}

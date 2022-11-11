import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Pagination from "./components/Pagination";
import { AuditLog, PickedDataKeys, PickedLogs } from "../../interfaces";
import DataTable from "./components/DataTable";
import { dataMapper } from "./helpers";
import { SortMode } from "../../utils";

interface AppProps {
  data: AuditLog[];
}

const logsPerPage = 10;

const App = ({ data }: AppProps) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const dataKeys =
    formattedData && (Object.keys(formattedData[0]) as PickedDataKeys[]);

  return (
    <Layout>
      <h1 className="flex justify-center text-slate-700 red font-bold bg-red-300">
        Hello Next.js 👋
      </h1>
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

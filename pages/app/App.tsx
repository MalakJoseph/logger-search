import { useState } from "react";
import Layout from "./components/Layout";
import Pagination from "./components/Pagination";
import { AuditLog } from "../../interfaces";
import DataTable from "./components/DataTable";

interface AppProps {
  data: AuditLog[];
}

const logsPerPage = 10;

const App = ({ data }: AppProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Layout>
      <h1 className="flex justify-center text-slate-700 red font-bold bg-red-300">
        Hello Next.js 👋
      </h1>
      <DataTable
        data={data}
        currentPage={currentPage}
        logsPerPage={logsPerPage}
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

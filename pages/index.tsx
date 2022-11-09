import type { NextPage } from "next";
import ErrorPage from "next/error";
import useSWR, { Fetcher } from "swr";
import Layout from "./app/components/Layout";
import { AuditLog } from "../interfaces";
import { BallTriangle } from "react-loader-spinner";
import handler from "./api/logs";

const IndexPage: NextPage = () => {
  const { data, error } = useSWR<AuditLog[], Error>("/api/logs", handler);

  console.log("auditLogs:", data);

  // currentPage: 1,
  // postsPerPage: 5,

  if (error) {
    return (
      <ErrorPage title={error.message} statusCode={500} withDarkMode={false} />
    );
  }

  if (!data)
    return (
      <div className="h-screen flex justify-center items-center">
        <BallTriangle />
      </div>
    );

  return (
    <Layout>
      <h1 className="flex justify-center text-slate-700 red font-bold bg-red-300">
        Hello Next.js 👋
      </h1>
    </Layout>
  );
};

export default IndexPage;

import type { NextPage } from "next";
import ErrorPage from "next/error";
import { BallTriangle } from "react-loader-spinner";
import useSWR from "swr";
import { AuditLog } from "../interfaces";
import { data } from "../tempData";
import handler from "./api/logs";
import App from "./app/App";

const IndexPage: NextPage = () => {
  // const { data, error } = useSWR<AuditLog[], Error>("/api/logs", handler);

  // if (error) {
  //   return (
  //     <ErrorPage title={error.message} statusCode={500} withDarkMode={false} />
  //   );
  // }

  if (!data)
    return (
      <div className="h-screen flex justify-center items-center">
        <BallTriangle />
      </div>
    );

  return <App data={data.result.auditLog} />;
};

export default IndexPage;

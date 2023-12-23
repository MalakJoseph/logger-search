import { Data } from "../../interfaces";

const handler = async () => {
  const res = await fetch(
    "https://run.mocky.io/v3/30c8148b-8dcf-4f8c-8f13-4fc457066a77"
  );
  const data: Data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error("An error occurred while fetching the data.");
  }

  return data.result.auditLog;
};

export default handler;

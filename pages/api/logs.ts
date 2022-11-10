import { Data } from "../../interfaces";

const handler = async () => {
  const res = await fetch(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );
  const data = await res.json().then((data: Data) => data);

  if (!res.ok || !data.success) {
    throw new Error("An error occurred while fetching the data.");
  }

  return data.result.auditLog;
};

export default handler;

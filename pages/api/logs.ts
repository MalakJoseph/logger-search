import { Data } from "../../interfaces";
import { tempData } from "../../tempData";

const handler = async () => {
  const data: Data = tempData;

  if (!data.success) {
    throw new Error("An error occurred while fetching the data.");
  }

  return data.result.auditLog;
};

export default handler;

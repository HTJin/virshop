import { useState, useEffect } from "react";
import { serverCalls } from "../api";

export const useFetchData = () => {
  const [fileName, setFileName] = useState<string>("");
  const [sheetData, setData] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  async function handleDataFetch(fileName: string) {
    try {
      let result = null;
      if (fileName !== "") {
        setFileName(fileName);
        result = await serverCalls.get(fileName);
        if (result.length === 0) {
          setData(null);
        } else {
          setData(result);
        }
      }
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    handleDataFetch(fileName);
  }, [fileName]);

  return { sheetData, getData: handleDataFetch, error };
};

import { useState, useEffect } from "react";
// import { serverCalls } from "../api";

export const useFetchData = () => {
  const [sheetData, setData] = useState<any>([]);

  async function handleDataFetch() {
    // const result = await serverCalls.get();
    // setData(result);
  }
  useEffect(() => {
    handleDataFetch();
  }, []);
  return { sheetData, getData: handleDataFetch };
};

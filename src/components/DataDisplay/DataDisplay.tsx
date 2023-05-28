import { useState } from "react";
// import { serverCalls } from "../../api";
import { useFetchData } from "../../hooks";
import { SheetForm } from "../SheetForm";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export const DataDisplay = () => {
  const { sheetData, getData } = useFetchData();
  const [fileName, setFileName] = useState("No Pull Sheet Detected")

  const myAuth = localStorage.getItem("myAuth");
  if (myAuth === "true") {
    if (sheetData.length === 0) {
      return (
        <div className="flex select-none flex-col items-center rounded-3xl border-4 border-dashed border-indigo-500 px-[10vw] py-[10vh]">
          <h3 className="mb-8 text-sm font-semibold">{fileName}</h3>
          <SheetForm onFileSelected={setFileName} />
        </div>
      );
    } else {
      const columns = Object.keys(sheetData[0]).map((field) => ({
        field,
        headerName: field,
        width: 150,
      }));
      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={sheetData.map((data: any, index: string) => ({ id: index, ...data }))}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            density="compact"
          />
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-col items-center">
        <h3 className="ml-[1.5ch] text-lg">Hey now, you're not logged in 😮</h3>
        <div className="mt-8 flex flex-col items-center justify-center">
          <Link
            className="font-xl animate-tranceBg rounded-full px-5 py-3 hover:outline hover:outline-[var(--hover-color)]"
            to={"/login"}
          >
            Log Me In!
          </Link>
          <div className="relative flex justify-center py-4 text-sm font-medium">
            <div
              className="relative inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-10 border-t border-gray-200" />
            </div>
            <span className="bg-transparent px-4 text-[var(--text-color)]">
              Or
            </span>
            <div
              className="relative inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-10 border-t border-gray-200" />
            </div>
          </div>
          <Link
            className="font-xl animate-tranceBg rounded-full px-6 py-3 hover:outline hover:outline-[var(--hover-color)]"
            to={"/register"}
          >
            Register Me!
          </Link>
        </div>
      </div>
    );
  }
};
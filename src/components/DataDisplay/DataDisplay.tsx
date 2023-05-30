import { useState } from "react";
import { SheetForm } from "../SheetForm";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgress, Button } from "@mui/material";
import Papa from "papaparse";

export const DataDisplay = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("No Pull Sheet Detected");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelected = (fileName: string, file: File) => {
    setIsLoading(true);
    setFileName(fileName);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setSheetData(results.data);
        setIsLoading(false);
      },
    });
  };

  const handleExport = () => {
    setIsLoading(true);
    const csv = Papa.unparse(sheetData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsLoading(false);
  };

  const myAuth = localStorage.getItem("myAuth");
  if (myAuth === "true") {
    if (isLoading) {
      return <CircularProgress />;
    } else {
      const columns =
        sheetData && sheetData.length > 0
          ? Object.keys(sheetData[0]).map((field) => ({
              field,
              headerName: field,
              width: 150,
            }))
          : [];
      return (
        <div>
          <div className="flex flex-col items-center">
            <h3 className="mb-8 text-sm font-semibold">{fileName}</h3>
            <SheetForm onFileSelected={handleFileSelected} />
          </div>
          {sheetData && sheetData.length > 0 && (
            <div className="flex mt-12 h-[60vh] w-[45vw]">
              <DataGrid
                rows={sheetData.map((data: any, index: number) => ({
                  id: index,
                  ...data,
                }))}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                density="compact"
                className="bg-slate-800 animate-gridTrance"
              />
            </div>
          )}
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

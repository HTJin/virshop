import { useState } from "react";
import { SheetForm } from "../SheetForm";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import Papa from "papaparse";

interface ParseResult {
  data: any[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    fields?: string[];
    truncated?: boolean;
    cursor: number;
  };
}

export const DataDisplay = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("No Pull Sheet Detected");
  const [fileSelected, setFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelected = (fileName: string, file: File) => {
    setIsLoading(true);
    setFileName(fileName);
    setFileSelected(true);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results: ParseResult) => {
        results.data.pop();
        const transformedData = results.data
          .slice(0, -1)
          .map((row: any) => ({
            R: row.Rarity,
            Q: row.Quantity,
            "Product Name": row["Product Name"],
            Set: row.Set,
            Number: row.Number,
          }))
          .sort((a: any, b: any) => {
            if (a["Set"] === b["Set"]) {
              if (a["R"] === b["R"]) {
                return a["Product Name"] < b["Product Name"] ? -1 : 1;
              }
              return a["R"] < b["R"] ? -1 : 1;
            }
            return a["Set"] < b["Set"] ? -1 : 1;
          });

        setSheetData(transformedData);
        setIsLoading(false);
      },
    });
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
            <SheetForm
              onFileSelected={handleFileSelected}
              fileSelected={fileSelected}
              setFileSelected={setFileSelected}
            />
          </div>
          {sheetData && sheetData.length > 0 && (
            <div className="mt-12 flex h-[60vh] w-[45vw]">
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
                className="animate-gridTrance bg-slate-800"
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

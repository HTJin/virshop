import { useState } from "react";
import { SheetForm } from "../SheetForm";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridColDef,
} from "@mui/x-data-grid";
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

interface CustomToolbarProps {
  fileName: string;
  onPrintData: () => void;
}

const CustomToolbar = ({ fileName, onPrintData }: CustomToolbarProps) => (
  <div className="flex justify-center">
    <GridToolbarContainer>
      <GridToolbar csvOptions={{ fileName }} />
      <button
        className="rounded px-4 py-2 text-sky-600 hover:bg-sky-600 hover:bg-opacity-5"
        onClick={onPrintData}
      >
        <span>(for tables w/more than 100 rows) ▶</span> Print
      </button>
    </GridToolbarContainer>
  </div>
);

export const DataDisplay = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("No Pull Sheet Detected");
  const [fileSelected, setFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [normalizedWidths, setNormalizedWidths] = useState<
    Record<string, number>
  >({});

  const handleFileSelected = (fileName: string, file: File) => {
    setIsLoading(true);
    setFileName(fileName);
    setFileSelected(true);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: ParseResult) => {
        const isPullSheetCSV = results.meta.fields?.[0] === "Product Line";
        const isInventoryCSV = results.meta.fields?.[0] === "TCGplayer Id";
        let transformedData: Array<Record<string, string | number>> = [];
        if (isPullSheetCSV) {
          results.data = results.data.filter(
            (row) =>
              !(
                row["Product Line"] &&
                row["Product Line"].startsWith(
                  "Orders Contained in Pull Sheet:"
                )
              )
          );
          transformedData = results.data.map((row: any) => {
            return {
              R: row.Rarity,
              Q: row.Quantity,
              "Product Name": row["Product Name"],
              Set: row.Set,
              Number: row.Number,
            };
          });
        } else if (isInventoryCSV) {
          transformedData = results.data.map((row: any) => {
            return {
              "TCGplayer Id": row["TCGplayer Id"],
              "Product Line": row["Product Line"],
              "Set Name": row["Set Name"],
              "Product Name": row["Product Name"],
              Title: row["Title"],
              Number: row["Number"],
              Rarity: row["Rarity"],
              Condition: row["Condition"],
              "TCG Market Price": row["TCG Market Price"],
              "TCG Direct Low": row["TCG Direct Low"],
              "TCG Low Price With Shipping": row["TCG Low Price With Shipping"],
              "TCG Low Price": row["TCG Low Price"],
              "Total Quantity": row["Total Quantity"],
              "Add to Quantity": row["Add to Quantity"],
              "TCG Marketplace Price": row["TCG Marketplace Price"],
              "Photo URL": row["Photo URL"],
            };
          });
        } else {
          transformedData = [];
        }
        let columnWidths: Record<string, number> = {};
        transformedData.forEach((row) => {
          Object.keys(row).forEach((key) => {
            const valueLength = row[key] ? row[key].toString().length : 0;
            columnWidths[key] = Math.max(columnWidths[key] || 0, valueLength);
          });
        });

        const sumWidths = Object.values(columnWidths).reduce(
          (a, b) => a + b,
          0
        );
        const normalizedWidths: Record<string, number> = {};
        Object.entries(columnWidths).forEach(([key, width]) => {
          normalizedWidths[key] = (width / sumWidths) * 800;
        });
        setNormalizedWidths(normalizedWidths);
        setColumnWidths(columnWidths);
        setSheetData(transformedData);
        setIsLoading(false);

        if (isPullSheetCSV) {
          let adjustedColumnWidths: Record<string, number> = {};
          Object.entries(columnWidths).forEach(([key, width]) => {
            if (key === "Number") {
              adjustedColumnWidths[key] = width * 1.25;
            } else {
              adjustedColumnWidths[key] = width * 0.75;
            }
          });
          setColumnWidths(adjustedColumnWidths);
        }
      },
    });
  };

  const printData = () => {
    let table = document.createElement("table");
    const columns =
      sheetData && sheetData.length > 0
        ? Object.keys(sheetData[0]).map((field) => ({
            field,
            headerName: field,
          }))
        : [];
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    columns.forEach((column) => {
      let th = document.createElement("th");
      th.textContent = column.headerName;
      headerRow.appendChild(th);
    });
    sheetData.forEach((data) => {
      let row = table.insertRow();
      columns.forEach((column) => {
        let cell = row.insertCell();
        cell.textContent = data[column.field];
      });
    });
    let newWin = window.open("");
    if (newWin) {
      newWin.document.write(table.outerHTML);
      newWin.print();
    }
  };

  const myAuth = localStorage.getItem("myAuth");
  if (myAuth === "true") {
    if (isLoading) {
      return <CircularProgress />;
    } else {
      const columns: GridColDef[] =
        sheetData && sheetData.length > 0
          ? Object.keys(sheetData[0]).map((field) => {
              let width = Math.max(
                100,
                normalizedWidths[field],
                columnWidths[field] * 8
              );
              if (field !== "Number") {
                width = width * 0.75;
              } else {
                width = width * 1.25;
              }
              return {
                field,
                headerName: field,
                width: width,
              };
            })
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
                  Toolbar: () => (
                    <CustomToolbar
                      fileName={`V_${fileName}`}
                      onPrintData={printData}
                    />
                  ),
                }}
                density="compact"
                className="animate-gridTrance bg-slate-700"
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

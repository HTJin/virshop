import { useState } from "react";
import { SheetForm } from "../SheetForm";
import { DataDisplay } from "../DataDisplay";
import { NavBar } from "../shared/NavBar";

export const Dashboard = () => {
  return (
    <div className="m-0 overflow-x-hidden p-0 text-[var(--text-color)]">
      <NavBar />
      <div className="relative my-[10vh] flex h-[80vh] mx-auto rounded-3xl w-[50vw] snap-center items-center justify-center self-center border border-y-pink-200 bg-gray-900 bg-opacity-60">
        <div>
          <DataDisplay />
        </div>
      </div>
    </div>
  );
};

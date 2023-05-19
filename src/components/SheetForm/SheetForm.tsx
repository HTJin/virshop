import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getProductName,
  getCondition,
  getCardNumber,
  getCardSet,
  getRarity,
  getQuantity,
  getFileName,
} from "../../redux/slices/rootSlice";
// import { serverCalls } from "../../api";

interface SheetFormProps {
  onFileSelected: (filename: string) => void;
}

export const SheetForm = ({ onFileSelected }: SheetFormProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({});
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(true);
      onFileSelected(file.name);
    } else {
      setFileSelected(false);
      onFileSelected("No Pull Sheet Detected");
    }
  };

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    // if (props.id!) {
    //   await serverCalls.update(props.id!, data);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <label className={`${fileSelected ? "text-green-600" : "text-sky-100"} cursor-pointer`}>
        <input
          type="file"
          className={`w-full cursor-pointer rounded-full pr-4 text-sm outline outline-1 file:mr-4 file:cursor-pointer file:rounded-l-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold ${
            fileSelected
              ? "outline-green-600 file:bg-green-600 file:text-green-100"
              : "outline-sky-100 file:bg-sky-100 file:text-sky-600 hover:outline-sky-600 file:hover:bg-sky-600 file:hover:text-sky-100"
          }`}
          onChange={handleFileChange}
        />
      </label>
    </form>
  );
};

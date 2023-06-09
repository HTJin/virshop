import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

interface SheetFormProps {
  onFileSelected: (filename: string, file: File) => void;
  fileSelected: boolean;
  setFileSelected: (selected: boolean) => void;
}

export const SheetForm = ({ onFileSelected, fileSelected, setFileSelected }: SheetFormProps) => {
  const { register, handleSubmit } = useForm();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(true);
      onFileSelected(file.name, file);
    } else {
      setFileSelected(false);
    }
  };

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    if (data.file.length > 0) {
      setFileSelected(true);
      onFileSelected(data.file[0].name, data.file[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <label
        className={`${
          fileSelected ? "text-green-600" : "text-sky-100"
        } cursor-pointer`}
      >
        <input
          {...register("file")}
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

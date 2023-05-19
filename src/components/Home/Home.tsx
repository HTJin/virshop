import { NavBar } from "../shared/NavBar";

interface Props {
  title: string;
}

export const Home = (props: Props) => {
  return (
    <div
      className="m-0 overflow-x-hidden p-0 text-[var(--text-color)]"
    >
      <NavBar />
      <div className="relative my-[10vh] flex h-[80vh] w-[100vw] snap-center items-center justify-center self-center bg-gray-900 bg-opacity-60">

      </div>
    </div>
  );
};

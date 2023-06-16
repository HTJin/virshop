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
      How it works: I take your collection off your hands and will sell your rare/mythic/expensive cards for you. We only get paid if you get paid! There is a X% fee charged for the service. Please note, any bulk commons or uncommons will be sold at 5¢ per uncommon and 3¢ per common. -- I think this should be behind some kind of fee details button to show exact rates. I would need the rates to be customizable.

Maybe some stats like so far we've paid out $x to collection owners.

Please feel free to schedule a pick up, drop off or consultation. If you already have an account, click here to log in
      </div>
    </div>
  );
};

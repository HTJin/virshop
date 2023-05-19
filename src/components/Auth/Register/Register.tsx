import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NavBar } from "../../shared";
import { GoogleButton } from "../Login/GoogleButton";
import logo from "../../../static/images/V.png";

export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({});
  const auth = getAuth();

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Welcome, ${user}`);
        navigate("/login");
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        console.log(errCode, errMsg);
      });
  };

  return (
    <div
      className="m-0 overflow-x-hidden p-0 text-[var(--text-color)]"
    >
      <NavBar />
      <div className="border--pink-200 relative mx-auto my-[10vh] flex h-[80vh] w-[50vw] snap-center items-center justify-center self-center rounded-3xl border bg-gray-900 bg-opacity-60">
        <div className="flex w-[300px] flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h2 className="mt-10 text-2xl font-bold">Create a new account</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 box-border w-full space-y-2"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@example.com"
                  required
                  className="block w-full rounded-md border-0 bg-[azure]/5 px-4 pb-2.5 pt-2 shadow-sm ring-1 ring-inset ring-[azure]/10 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="●●●●●●●●"
                  required
                  className="block w-full rounded-md border-0 bg-[azure]/5 px-4 pb-2.5 pt-2 shadow-sm ring-1 ring-inset ring-[azure]/10 placeholder:text-[10px] focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="mx-auto mt-10 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          <div className="relative mt-4 w-full">
            <div className="relative flex justify-center text-sm font-medium">
              <div
                className="relative inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-10 border-t border-gray-200" />
              </div>
              <span className="bg-transparent px-4 text-[var(--text-color)]">
                Or continue with
              </span>
              <div
                className="relative inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-10 border-t border-gray-200" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <GoogleButton />
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-purple-400 hover:text-[var(--main-color)]"
            >
              Login Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

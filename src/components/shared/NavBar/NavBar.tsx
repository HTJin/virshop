import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import logo from "../../../static/images/V.png"

export const NavBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation().pathname;

  const logOut = async () => {
    await signOut(auth);
    localStorage.setItem("myAuth", "false");
    navigate("/")
  };
  const myAuth = localStorage.getItem("myAuth");
  return (
    <div
      className={`fixed top-0 z-10 flex w-[100vw] items-center justify-between bg-gradient-to-t from-emerald-900 to-slate-950 px-0 py-[.5em] shadow-xl shadow-teal-500/70`}
    >
      <h1 className="ml-[.5em] text-[1.5em] uppercase">
        <Link className="list-none font-bruno no-underline" to="/">
          <img src={logo} alt="Logo" className="h-8 w-8" />
        </Link>
      </h1>
      <ul className="mr-[8em] flex w-full list-none justify-center no-underline">
        <Stack
          direction="row"
          divider={
            <Divider
              color="var(--text-color)"
              orientation="vertical"
              flexItem
            />
          }
          spacing={2}
        >
          <li
            className={`${
              location === "/"
                ? "underline decoration-sky-400 decoration-wavy underline-offset-4"
                : "duration-300 hover:underline hover:decoration-sky-400 hover:decoration-wavy hover:underline-offset-4"
            }`}
          >
            <Link className="p-[1em] no-underline" to="/">
              Home
            </Link>
          </li>
          {myAuth === "true" ? (
            <li
              className={`${
                location === "/dashboard"
                  ? "underline decoration-sky-400 decoration-wavy underline-offset-4"
                  : "duration-300 hover:underline hover:decoration-sky-400 hover:decoration-wavy hover:underline-offset-4"
              }`}
            >
              <Link className="p-[1em] no-underline" to="/dashboard">
                Dashboard
              </Link>
            </li>
          ) : (
            <li
              className={`${
                location === "/register"
                  ? "underline decoration-sky-400 decoration-wavy underline-offset-4"
                  : "duration-300 hover:underline hover:decoration-sky-400 hover:decoration-wavy hover:underline-offset-4"
              }`}
            >
              <Link className="p-[1em] no-underline" to="/register">
                Register
              </Link>
            </li>
          )}
          {myAuth === "true" ? (
            <li
              onClick={logOut}
              className="duration-300 hover:underline hover:decoration-sky-400 hover:decoration-wavy hover:underline-offset-4"
            >
              <Link className="p-[1em] no-underline" to="/">
                Logout
              </Link>
            </li>
          ) : (
            <li
              className={`${
                location === "/login"
                  ? "underline decoration-sky-400 decoration-wavy underline-offset-4"
                  : "duration-300 hover:underline hover:decoration-sky-400 hover:decoration-wavy hover:underline-offset-4"
              }`}
            >
              <Link className="p-[1em] no-underline" to="/login">
                Login
              </Link>
            </li>
          )}
        </Stack>
      </ul>
    </div>
  );
};

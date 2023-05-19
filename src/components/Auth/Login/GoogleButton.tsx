import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import GoogleLogo from "../../../static/images/google.png";

export const GoogleButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);

  const loginGoogle = async () => {
    await signInWithGoogle();
    if (auth.currentUser) {
      localStorage.setItem("myAuth", "true");
      navigate("/dashboard");
    } else {
      console.log("Failed to login with Google");
      navigate("/login");
    }
  };
  const logOut = async () => {
    await signOut(auth);
    localStorage.setItem("myAuth", "false");
    navigate("/login");
  };

  if (loading) {
    return <CircularProgress />;
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("user_token", user.uid);
    }
  });

  const myAuth = localStorage.getItem("myAuth");

  if (myAuth === "true") {
    return (
      <button
        className="mx-auto mt-10 flex justify-center rounded-md bg-[var(--main-color)] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={logOut}
      >
        Log Me Out!
      </button>
    );
  } else {
    return (
      <button
        onClick={loginGoogle}
        className="rounded-full bg-indigo-100 px-4 py-2 hover:animate-tranceBg hover:text-indigo-100 animate-trance"
      >
        <span className="flex items-center font-bold tracking-wide">
          <img src={GoogleLogo} alt="Google Logo" className="mr-4 h-8 w-8" />
          Google
        </span>
      </button>
    );
  }
};

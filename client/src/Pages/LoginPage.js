import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyAnimation from "../Components/EmptyAnimation";
import InternalDashboardContext from "../UserContext";
import LoginLottie from "./../Assets/LoginLottie.json";
const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const userCtx = useContext(InternalDashboardContext);

  const login = () => {
    if (loginUsername === "") {
      alert("Please enter username");
      return false;
    } else if (loginPassword === "") {
      alert("Please enter password");
      return false;
    }
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    })
      .then((res) => {
        if (res.data !== "IncorrectDetails") {
          userCtx.setIsUserLoggedIn(true);
          window.sessionStorage.setItem("LoginStatus", true);
        } else {
          alert("Check credentials");
        }
        console.log(res);
      })
      .catch((res) => {});
  };

  useEffect(() => {
    if (userCtx.isUserLoggedIn) {
      navigate("/home");
    }
  }, [userCtx.isUserLoggedIn]);

  return (
    <>
      <div className="grid grid-cols-12 h-full w-full absolute overflow-hidden flex bg-cover">
        <div className="col-span-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center">
          <div className=" h-80 w-80  mx-auto">
            <p className="flex justify-center">
              {/* Lottie Player for Animation */}
              <EmptyAnimation animationData={LoginLottie} isLoop={true} />
            </p>
          </div>{" "}
        </div>
        <div className="col-span-9 flex justify-center items-center">
          <div className="h-80 w-96 rounded-lg shadow-2xl py-8 px-10">
            <span className="text-3xl text-md font-semibold	">Welcome</span>
            <form className="mt-8 mb-2">
              <div className="mb-8">
                <span className="mr-4">Username :</span>
                <input
                  className="border-b border-1 focus:outline-0"
                  onChange={(e) => setLoginUsername(e.target.value)}
                ></input>
              </div>
              <div>
                <span className="mr-4">Password :</span>
                <input
                  className="border-b border-1 focus:outline-0"
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></input>
              </div>
              <button
                type="button"
                className="mt-8 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  login();
                }}
              >
                Login
              </button>
            </form>
            <span className="text-grey-500">
              <p className="text-xs">Don't have an account? </p>
              <p
                className="text-blue-700 cursor-pointer hover:font-bold text-sm"
                onClick={() => {
                  navigate("/");
                }}
              >
                Register
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

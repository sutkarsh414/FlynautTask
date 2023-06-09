import EmptyAnimation from "../Components/EmptyAnimation";
import LoginLottie from "./../Assets/LoginLottie.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import io from "socket.io-client";
import moment from "moment";

const socket = io("http://localhost:4001");


const RegistrationPage = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPasssword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const [date, setDate] = useState("");

  // Convert Data to Specific fomrate 08 July 2022 10:00 AM
  function convertDateToFormat(value) {
    let updatedLocalDate = moment
      .utc(value)
      .local()
      .format("DD MMMM YYYY hh:mm:ss A");
    return updatedLocalDate;
  }

  //Used socket programming to show current date time span
  useEffect(() => {
    socket.on("date", (currentDate) => {
      setDate(convertDateToFormat(currentDate));
    });
  }, []);

  useEffect(()=>{
    console.log(date)
  },[date])

  //Api call and promise
  const register = () => {
    if(registerUsername === ""){
      alert("Please enter username");
      return false;
    }else if(registerPasssword === ""){
      alert("Please enter password");
      return false;
    }
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPasssword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
        console.log(res)
        //Handled navigation
        navigate("/login")
    });
  };

  return (
    <>
      <div className="grid grid-cols-12 h-full w-full absolute overflow-hidden flex bg-cover">
        <div className="col-span-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <span className="absolute top-10 text-white text-2xl">{date}</span>
          <div className=" h-80 w-80  mx-auto">
            <p className="flex justify-center">
              <EmptyAnimation animationData={LoginLottie} isLoop={true} />
            </p>
          </div>{" "}
        </div>
        <div className="col-span-9 flex justify-center items-center">
          <div className="h-80 w-96 rounded-lg shadow-2xl py-8 px-10">
            <span className="text-3xl text-md font-semibold	">
              Create Account
            </span>
            <form className="mt-8 mb-2">
              <div className="mb-8">
                <span className="mr-4">Username :</span>
                <input
                  className="border-b border-1 focus:outline-0"
                  onChange={(e) => setRegisterUsername(e.target.value)}
                ></input>
              </div>
              <div>
                <span className="mr-4">Password :</span>
                <input
                  className="border-b border-1 focus:outline-0"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                ></input>
              </div>
              <button
                type="button"
                className="mt-8 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  register();
                }}
              >
                Register
              </button>
            </form>
            <span className="text-grey-500">
              <p className="text-xs">Already have an account? </p>
              <p className="text-blue-700 cursor-pointer hover:font-bold text-sm"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;

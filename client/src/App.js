import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import {
  InternalDashboardContextProvider
} from "./UserContext";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";


function App() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    debugger
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  // const getUser = () => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:4000/user",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <InternalDashboardContextProvider>
                <LoginPage />
              </InternalDashboardContextProvider>
            }
          />
          <Route exact path="/" element={<RegistrationPage />} />
          <Route
            exact
            path="/home"
            element={
              <InternalDashboardContextProvider>
                <HomePage />
              </InternalDashboardContextProvider>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div> */}
    </div>
  );
}

export default App;

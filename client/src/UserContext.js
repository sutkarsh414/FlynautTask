import { useState } from "react";
import { createContext } from "react";

const InternalDashboardContext = createContext({
  //States for Internal Dashboard List View
  isUserLoggedIn: false,
  setIsUserLoggedIn: (flag) => {},
});

export const InternalDashboardContextProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleSetIsUserLoggedIn = (flag) => {
    setIsUserLoggedIn(flag);
  };

  return (
    <InternalDashboardContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        setIsUserLoggedIn: handleSetIsUserLoggedIn,
      }}
    >
      {props.children}
    </InternalDashboardContext.Provider>
  );
};

export default InternalDashboardContext;

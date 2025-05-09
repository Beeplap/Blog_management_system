import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";

const Authprovider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  console.log("Authprovider token", token);
  console.log("Authprovider user", user);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (logintoken, userDetails) => {
    setToken(logintoken);
    setUser(userDetails);
  };

  return (
    <Authcontext.Provider value={{ token, user, login }}>
      {children}
    </Authcontext.Provider>
  );
};
export default Authprovider;

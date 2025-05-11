import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";

const Authprovider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  console.log("Authprovider token", token);
  console.log("Authprovider user", user);

  // Initialize token and user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save token and user to localStorage whenever they change
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Saved token and user to localStorage");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Cleared localStorage");
    }
  }, [token, user]);

  const login = (logintoken, userDetails) => {
    console.log("Logging in with:", logintoken, userDetails);
    setToken(logintoken);
    setUser(userDetails);
  };

  const logout = () => {
    console.log("Logging out");
    setToken(null);
    setUser(null);
  };

  return (
    <Authcontext.Provider value={{ token, user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;

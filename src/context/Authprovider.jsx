import React, { useState } from 'react'
import { Authcontext } from './Authcontext'

const Authprovider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    console.log("Authprovider token", token);
    console.log("Authprovider user", user);

    const login = (logintoken, userDetails) => {
        setToken(logintoken);
        setUser(userDetails);
    }   

  return (
    <Authcontext.Provider value={{ token, user, login }}>
        {children}
    </Authcontext.Provider>
  )
}
export default Authprovider
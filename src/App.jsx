import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Management from "./pages/Management";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Block_management_system" element={<Landing />} />
        <Route path="/Block_management_system/login" element={<Login />} />
        <Route path="/Block_management_system/signup" element={<Signup />} />
        <Route path="/Block_management_system/management" element={<Management />} />
      </Routes>
    </Router>
  );
};

export default App;

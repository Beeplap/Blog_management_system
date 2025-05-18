import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import Protectedroute from "./components/Protectedroute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import SingleBlogPage from "./components/SingleBlogPage.jsx";
import Myblog from "./pages/MyBlogs.jsx";
import Profile from "./pages/Profile.jsx";

const BlogListWrapper = () => {
  return <div>Blog List Placeholder</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createblogs" element={<CreateBlog />} />
        
        <Route
          path="/dashboard"
          element={
            <Protectedroute>
              <Dashboard />
            </Protectedroute>
          }
        />
        <Route
          path="/singleblogs/:id"
          element={
            <Protectedroute>
              <SingleBlogPage />
            </Protectedroute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <Protectedroute>
              <Myblog />
            </Protectedroute>
          }
        />
        <Route
          path="/profile"
          element={
            <Protectedroute>
              <Profile />
            </Protectedroute>
          }
        />
        <Route path="/blogs" element={<BlogListWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

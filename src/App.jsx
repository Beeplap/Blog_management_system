import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import Protectedroute from "./components/Protectedroute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import SingleBlogPage from "./pages/SingleBlogPage.jsx";
import Myblogs from "./pages/MyBlogs.jsx";

const BlogListWrapper = () => {
  return <div>Blog List Placeholder</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Dashboard"
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
              <Myblogs/>
            </Protectedroute>
          }
        />
        


        <Route index element={<BlogListWrapper />} />
        <Route path="/createblogs" element={<CreateBlog />} />

        <Route path="/Blog_management_system/" element={<Landing />} />
        <Route path="/Blog_management_system/login" element={<Login />} />
        <Route path="/Blog_management_system/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

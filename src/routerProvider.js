import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
// import { BrowserRouter } from "react-router";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Dashboard from "./Component/Dashboard";
// import "antd/dist/antd.css";
import Home from "./Component/Home";
import Login from "./Component/Login";
import UserComponent from "./Component/Dashboard/UserComponent";
import { Result } from "antd";
import LoginForm from "./Component/LoginForm";
import EditUser from "./Component/editUser";
import Profile from "./Component/Dashboard/Profile";
import axios from "axios";

const RouterProvider = () => {
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await axios.get("http://localhost:5000/isLoggendIn", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        if (error.response?.data?.error === "Invalid or expired token") {
          window.location.href = "/";
          localStorage.removeItem("token");
        }
      }
    })();
  });
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createUser" element={<LoginForm />} />
          <Route exact path={"/user/:userId/Dashboard"} element={<Dashboard />}>
            <Route path="/user/:userId/Dashboard/Home" element={<Home />} />
            <Route
              path="/user/:userId/Dashboard/profile"
              element={<Profile />}
            />
            <Route path="/user/:userId/Dashboard/About" element={<About />} />
            <Route
              path="/user/:userId/Dashboard/Contact"
              element={<Contact />}
            />
            <Route
              path="/user/:userId/Dashboard/edituser"
              element={<EditUser />}
            />
            <Route
              path="/user/:userId/Dashboard/emp/:id"
              element={<UserComponent />}
            />
            <Route
              path="*"
              exact={true}
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Link to={"/"}>Back sdfsdfsdfs</Link>}
                />
              }
            />
          </Route>
          <Route
            path="*"
            exact={true}
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to={"/"}>Back Home</Link>}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default RouterProvider;

import { Result } from "antd";
import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import About from "../About";
import Contact from "../Contact";
import EditUser from "../editUser";
import Home from "../Home";
import Quote from "../quotes/quote";
import Admin from "./Admin";
import Profile from "./Profile";
import UserComponent from "./UserComponent";

const DashboardPage = () => {
  const activeUser = localStorage.getItem("user");
  const isAdmin = JSON.parse(activeUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!activeUser) navigate("/");
  });

  return (
    <Routes>
      {!activeUser && (
        <Route
          exact={true}
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, please login or sign up user."
              extra={<Link to={"/"}>Back To Login Page</Link>}
            />
          }
        />
      )}
      {activeUser && (
        <>
          <Route exact path="/" element={<Quote />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/emp/:id" element={<UserComponent />} />
          <Route path="/Profile" element={<Profile />} />
          {isAdmin?.userType === "Admin" && (
            <Route path="/adminPage" element={<Admin />} />
          )}
          <Route
            exact={true}
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Link to={activeUser ? "/Home" : "/"}>Back Dashboard</Link>
                }
              />
            }
          />
        </>
      )}
    </Routes>
  );
};

export default DashboardPage;

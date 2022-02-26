import { Result } from "antd";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "../About";
import Contact from "../Contact";
import EditUser from "../editUser";
import Home from "../Home";
import DashboardComponent from "./DashboardComponent";
import UserComponent from "./UserComponent";

const DashboardPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DashboardComponent />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/edituser" element={<EditUser />} />
      <Route path="/emp/:id" element={<UserComponent />} />
      <Route
        exact={true}
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={"/"}>Back Dashboard</Link>}
          />
        }
      />
    </Routes>
  );
};

export default DashboardPage;

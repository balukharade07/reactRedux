import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
// import { BrowserRouter } from "react-router";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Dashboard from "./Component/Dashboard";
import "antd/dist/antd.css";
import Home from "./Component/Home";
import { store } from "./Store";
import Login from "./Component/Login";
import UserComponent from "./Component/Dashboard/UserComponent";
import { Result } from "antd";
import LoginForm from "./Component/LoginForm";
import EditUser from "./Component/editUser";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/createUser" element={<LoginForm />} />
            <Route exact path="/user/:userId/Dashboard" element={<Dashboard />}>
              <Route path="/user/:userId/Dashboard/Home" element={<Home />} />
              <Route path="/user/:userId/Dashboard/About" element={<About />} />
              <Route path="/user/:userId/Dashboard/Contact" element={<Contact />} />
              <Route path="/user/:userId/Dashboard/edituser" element={<EditUser />} />
              <Route path="/user/:userId/Dashboard/emp/:id" element={<UserComponent />} />
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
      </Provider>
    );
  }
}

export default App;

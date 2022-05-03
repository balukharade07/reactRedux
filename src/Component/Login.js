import React, { useEffect } from "react";
import { Col, Row, Form, Input, Button, message } from "antd";
import ReactIcon from "../assets/logo512.png";

import "./common.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Action";
import { USER_LOG } from "../Action/type";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllUser = useSelector((state) => state.loginInfo?.getAllUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onFinish = (values) => {
    const getUserLogin = getAllUser?.find(
      (item) =>
        item.username === values.username && item.password === values.password
    );
    if (getUserLogin?.id) {
      dispatch({type:USER_LOG, payload: true});
      navigate(`user/${getUserLogin.id}/Dashboard`);
      message.success("Login Successfully...!!");

    } else {
      message.error("Login Failed...!!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="Login-page">
      <Row>
        <Col span={6} className="aside-login">
          <div className="login-form">
            <img className="react-img" src={ReactIcon} alt="login" />
          </div>
        </Col>
        <Col span={18}>
          <div className="login-form">
            <div className="form-login">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                    { whitespace: true, message: "White space not allowed!" },
                  ]}
                >
                  <Input placeholder="Enter User Name" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                  <Button type="link" onClick={() => navigate("/createUser")}>
                    Create User
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

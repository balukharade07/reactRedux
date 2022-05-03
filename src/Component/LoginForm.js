import React, { useEffect } from "react";
import { Col, Row, Form, Input, Button, message } from "antd";
import ReactIcon from "../assets/logo512.png";
import { useDispatch, useSelector } from "react-redux";
import { createUser, editUser, getUser } from "../Action";
import { useNavigate, useParams } from "react-router";
// import './App.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const userInfo = useSelector((state) => state.loginInfo.getUser);
  const [form] = Form.useForm();

  useEffect(() => {
    if(!userInfo) dispatch(getUser(userId));
  },[dispatch]);

  useEffect(() => {
    if(userId) form.setFieldsValue(userInfo);
  },[userInfo]);

  const onFinish = (values) => {
    if(userId) {
      dispatch(editUser(values));
      message.success("User Updated Successfully...!!")
      navigate(`/user/${userId}/Dashboard`);
    } else {
      delete values.id;
      dispatch(createUser(values));
      message.success("User Created Successfully...!!");
      navigate("/");
    }
  };

  return (
    <div className={userId ? "" : "Login-page"}>
      <Row>
        {!userId && (
          <Col span={6} className="aside-login">
            <div className="login-form">
              <img className="react-img App-logo" src={ReactIcon} alt="login" />
            </div>
          </Col>
        )}

        <Col offset={userId ? 3 : 0} span={18}>
          <div className={userId ? "edit-form" : "login-form"} >
            <div className="form-login">
              <h2 style={{ textAlign: "center", paddingBottom: "15px" }}>
                {userId ? "Update User" : "Create User"}
              </h2>
              <Form
                name="control-hooks"
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                form={form}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                    { whitespace: true, message: "White space not allowed!" },
                  ]}
                >
                  <Input placeholder="Enter User Name"/>
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter User Password"/>
                </Form.Item>
                <Form.Item name="id" label="Name" style={{ display: "none" }}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }, { type: "email" }]}
                >
                  <Input placeholder="Enter User Email"/>
                </Form.Item>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter User Role"/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                  <Button type="primary" htmlType="submit">
                    {userId ? "Update User" : "Create User"}
                  </Button>
                </Form.Item>
                {!userId && (
                  <Form.Item wrapperCol={{ offset: 11, span: 12 }}>
                    <Button type="link" onClick={() => navigate("/")}>
                      Login
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;

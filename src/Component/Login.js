import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  List,
  Button,
  message,
  Modal,
  Select,
} from "antd";
import ReactIcon from "../assets/logo512.png";
import axios from "axios";
import "./common.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getRootURL, getToken } from "./Constant";
// import { getAllUsers } from "../Action";

function Login() {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();
  const [getAllQuote, setGetAllQuote] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(1);
  const [filterBy, setFilterBy] = useState("all");
  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await axios.get(getRootURL("isLoggendIn"), getToken());
        if (userInfo?.data?._id) {
          navigate(`user/${userInfo.data._id}/Dashboard`);
        } else {
          await handleUserList();
        }
      } catch (error) {
        await handleUserList();
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllQuotes = (page, _id = "all") => {
    axios
      .get(getRootURL(`getAllQuote/${_id}?pageSize=${5}&page=${page}`))
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setGetAllQuote(response.result);
        setCount(response.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangePage = (page) => {
    setCurrent(page);
    getAllQuotes(page, filterBy);
  };

  const onFinish = (values) => {
    axios
      .post(getRootURL("login"), values, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response?.data));
        message.success("Login Successfully...!!");
        dispatch({
          type: "USER_LOG",
          payload: response.data.user,
        });
        navigate(`user/${response.data._id}/Dashboard`);
      })
      .catch((error) => {
        message.warning("Email and password are incorrect");
        localStorage.removeItem("user");
      });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const onForgotEmail = async () => {
    try {
      const value = await form?.validateFields?.();
      if (value?.email) {
        return await axios
          .get(getRootURL(`forgotPassword/${value.email}`))
          .then((response) => response.data)
          .then((response) => {
            form?.resetFields();
            passwordForm?.resetFields();
            modal.confirm(forgotPasswordModal(response));
            return Promise.resolve(true);
          })
          .catch((error) => {
            message.error("Email is not valid!");
            return Promise.reject(false);
          });
      } else {
        return Promise.reject(false);
      }
    } catch (error) {
      return Promise.resolve(false);
    }
  };

  const config = () => {
    return {
      title: "Confirm Your Email",
      onOk: () => onForgotEmail(),
      icon: null,
      closable: true,
      width: "500px",
      content: (
        <Form
          name="control-hooks"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
              { whitespace: true, message: "White space not allowed!" },
            ]}
          >
            <Input type="email" placeholder="Please input your email!" />
          </Form.Item>
        </Form>
      ),
    };
  };

  const onForgotPassword = async (response) => {
    const value = await passwordForm.validateFields();
    if (value) {
      const updatedValue = {
        password: value.password,
      };
      await axios
        .put(getRootURL(`resetPassword/${response._id}`), updatedValue)
        .then((response) => {
          message.success("Password Updated Successfully...!!");
          passwordForm?.resetFields();
          return Promise.resolve(true);
        })
        .catch((error) => {
          message.error("Failed to update password!");
          return Promise.reject(false);
        });
    } else {
      return Promise.reject(false);
    }
  };

  const forgotPasswordModal = (response) => {
    return {
      title: "Create New Password",
      onOk: () => onForgotPassword(response),
      icon: null,
      closable: true,
      width: "500px",
      content: (
        <>
          <Form
            name="control-hooks"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={passwordForm}
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Please enter your password!" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Please confirm your password!" />
            </Form.Item>
          </Form>
        </>
      ),
    };
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
          <div style={{ textAlign: "right", margin: "20px" }}>
            <Button type="primary" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Quotes" : "Login"}
            </Button>
          </div>
          {isLogin && (
            <div className="login-form">
              <div className="form-login">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    hasFeedback
                    rules={[
                      { required: true, message: "Please input your Email!" },
                      { whitespace: true, message: "White space not allowed!" },
                    ]}
                  >
                    <Input type="email" placeholder="Enter User Email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter Password" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                    <Button danger htmlType="reset" type="primary">
                      Reset
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => navigate("/createUser")}
                      data-testid="createUser"
                    >
                      Create User
                    </Button>
                  </Form.Item>
                </Form>
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="dashed"
                    style={{ color: "#1890ff" }}
                    onClick={() => {
                      form?.resetFields();
                      modal.confirm(config());
                    }}
                  >
                    Forgot Password!
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!isLogin && (
            <Row style={{ marginBottom: "30px" }}>
              <Col offset={6} span={12}>
                <p className="all-quote">All Quote's</p>
                <Select
                  showSearch
                  placeholder="Select User"
                  style={{
                    width: "200px",
                    position: "absolute",
                    top: "50px",
                    right: "0px",
                    zIndex: "99",
                  }}
                  onChange={(_id) => {
                    setCurrent(1);
                    setFilterBy(_id);
                    getAllQuotes(1, _id);
                  }}
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear={false}
                  defaultValue={filterBy}
                  value={filterBy}
                  data-testid="quote-select"
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  <Select.Option key="all" value={undefined}>
                    All
                  </Select.Option>

                  {userList?.map((item) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <List
                  itemLayout="horizontal"
                  dataSource={getAllQuote}
                  pagination={{
                    pageSize: 5,
                    current,
                    total: count,
                    hideOnSinglePage: false,
                    showSizeChanger: false,
                    onChange: (page) => onChangePage(page),
                  }}
                  renderItem={(record) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Button shape="circle">
                            <img
                              style={{
                                width: "30px",
                                height: "30px",
                                marginTop: "-5px",
                                borderRadius: "50%",
                              }}
                              src={`https://robohash.org/${
                                record.name || "text"
                              }.png`}
                              alt="test"
                            />
                          </Button>
                        }
                        title={record.quote}
                        description={`~ ${record.name}`}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          )}
        </Col>
        {contextHolder}
      </Row>
    </div>
  );

  async function handleUserList() {
    await axios
      .get(getRootURL("usersList"))
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setUserList(response);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllQuotes(1);
  }
}

export default Login;

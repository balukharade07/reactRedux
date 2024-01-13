import React, { useEffect, createContext, useCallback, useState } from "react";
import { Col, Row, Form, Input, List, Button, message, Modal, Avatar, Select } from "antd";
import ReactIcon from "../assets/logo512.png";
import axios from "axios";
import "./common.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Action";
import { USER_LOG } from "../Action/type";

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

function Login() {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();
  // const getAllUser = useSelector((state) => state.loginInfo?.getAllUser);
  const [getAllQuote, setGetAllQuote] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(1);
  const [filterBy, setFilterBy] = useState('all');
  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem('user');
    getAllQuotes(1);
    axios.get(`http://localhost:5000/usersList`)
      .then((response) => {
        return response.data;
      }).then((response) => {
        setUserList(response)
      })
  }, []);

  const getAllQuotes = (page, _id = 'all') => {
    axios.get(`http://localhost:5000/getAllQuote/${_id}?pageSize=${5}&page=${page}`)
      .then((response) => {
        return response.data
      })
      .then((response) => {
        setGetAllQuote(response.result);
        setCount(response.count)
      })
  }

  const onChangePage = (page) => {
    setCurrent(page);
    getAllQuotes(page, filterBy);
  }

  const debounce = (fn, delay) => {
    let timer;
    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  }

  const delaySaveToDb = useCallback(debounce((val) => {
    onFinish(val);
  }
    , 1000), []);

  const handleSubmit = (e) => {
    delaySaveToDb(e)
  }

  const onFinish = (values) => {
    axios.post('http://localhost:5000/login', values)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response?.data));
        message.success("Login Successfully...!!");
        navigate(`user/${response?.data?._id}/Dashboard`);
      }).catch(error => {
        message.error('Email and password are incorrect');
        localStorage.removeItem('user')
      })
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const onForgotEmail = async () => {
    const value = await form.validateFields();
    if (value) {
      await axios.get(`http://localhost:5000/forgotPassword/${value.email}`)
        .then(response => {
          return response.data;
        }).then(response => {
          form?.resetFields();
          passwordForm?.resetFields();
          modal.confirm(forgotPasswordModal(response));
          return Promise.resolve(true);
        }).catch(error => {
          message.error('Email is not valid!');
          return Promise.reject(false)
        })
    } else {
      return Promise.reject(false)
    }
  }

  const config = () => {
    return {
      title: 'Confirm Your Email',
      onOk: () => onForgotEmail(),
      icon: false,
      closable: true,
      width: '500px',
      content: (
        <>
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
                  type: 'email'
                },
                { whitespace: true, message: "White space not allowed!" },
              ]}
            >
              <Input type="email" placeholder="Please input your email!" />
            </Form.Item>
          </Form>
        </>
      ),
    }
  };


  const onForgotPassword = async (response) => {
    const value = await passwordForm.validateFields();
    if (value) {
      const updatedValue = {
        password: value.password
      }
      await axios.put(`http://localhost:5000/update/${response._id}`, updatedValue)
        .then(response => {
          message.success('Password Updated Successfully...!!');
          passwordForm?.resetFields();
          return Promise.resolve(true);
        }).catch(error => {
          message.error('Failed to update password!');
          return Promise.reject(false)
        })
    } else {
      return Promise.reject(false)
    }
  }

  const forgotPasswordModal = (response) => {
    return {
      title: 'Updated Your Password',
      onOk: () => onForgotPassword(response),
      icon: false,
      closable: true,
      width: '500px',
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
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder='Please enter your password!' />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Please confirm your password!' />
            </Form.Item>
          </Form>
        </>
      ),
    }
  };

  return (
    <div className="Login-page" >
      <Row>
        <Col span={6} className="aside-login">
          <div className="login-form">
            <img className="react-img" src={ReactIcon} alt="login" />
          </div>
        </Col>
        <Col span={18}>
          <div style={{ textAlign: 'right', margin: '20px' }}><Button type="primary" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Quotes' : 'Login'}</Button></div>
          {isLogin &&
            (
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
                        { required: true, message: "Please input your password!" },
                      ]}
                    >
                      <Input.Password placeholder="Enter Password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <Button danger style={{ marginLeft: '10px' }} htmlType='reset' type="primary">
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                      <Button type="primary" ghost onClick={() => navigate("/createUser")}>
                        Create User
                      </Button>
                    </Form.Item>
                  </Form>
                  <div style={{ textAlign: 'center' }}>
                    <Button type='dashed' style={{ color: '#1890ff' }} onClick={() => {
                      form?.resetFields();
                      modal.confirm(config());
                    }}>
                      Forgot Password!
                    </Button>
                  </div>
                </div>
              </div>
            )
          }

          {!isLogin && (
            <Row style={{ marginBottom: '30px' }}>
              <Col offset={6} span={12}>
                <p className="all-quote">All Quote's</p>
                <Select showSearch
                  placeholder='Select User'
                  style={{
                    width: '200px',
                    position: 'absolute',
                    top: '50px',
                    right: '0px',
                    zIndex: '99'
                  }}
                  onChange={(_id) => {
                    setCurrent(1);
                    setFilterBy(_id)
                    getAllQuotes(1, _id);
                  }}
                  filterOption={(input, option) =>
                    (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear={false}
                  defaultValue={filterBy}
                  value={filterBy}
                >
                  <Select.Option key={'all'} value={undefined}>All</Select.Option>
                  {userList?.map(item => {
                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                  })}
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
                    onChange: (page) => onChangePage(page)
                  }}
                  renderItem={(record) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Button shape="circle">
                          <img style={{ width: '30px', height: '30px', marginTop: '-5px', borderRadius: '50%' }} src={`https://robohash.org/${(record.name || 'text')}.png`} />
                        </Button>}
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
}

export default Login;

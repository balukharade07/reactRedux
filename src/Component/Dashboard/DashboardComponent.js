import { Button, Card, Col, Form, Input, InputNumber, message, Modal, Popconfirm, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React, { Component } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllEmployees,
  deleteEmployee,
  addEmployee,
  editEmployee,
} from "../../Action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class DashboardComponent extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.getAllEmployees();
  }

  handleOk = () => {
    const userInfo = this.formRef.current.getFieldsValue();
    if (userInfo.id) {
      this.props.editEmployee(userInfo);
    } else {
      this.props.addEmployee(userInfo);
    }

    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    this.formRef.current?.resetFields();
  };
  handleToggle = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    this.formRef.current?.resetFields();
  };

  onEdit = (value) => {
    this.setState(
      {
        isModalVisible: true,
      },
      () =>
        this.formRef.current.setFieldsValue({
          ...value,
        })
    );
  };

  addUser = () => {
    const { isModalVisible } = this.state;
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Modal
        title="Add User"
        visible={isModalVisible}
        onCancel={this.handleToggle}
        footer={false}
      >
        <Form
          name="basic"
          onFinish={this.handleOk}
          autoComplete="off"
          ref={this.formRef}
          {...layout}
        >
          <Form.Item
            name="first_name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="id" label="Name" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true }, { type: "number", min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="status" label="status">
            <Input />
          </Form.Item>
          <Form.Item name="introduction" label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 15, span: 9 }}>
            <Button style={{ marginRight: "10px" }} onClick={this.handleToggle}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  confirm(id) {
    this.props.deleteEmployee(id)
    message.success('User Delete Successfully');
  }

  getRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  }

  render() {
    const { employees } = this.props;
    return (
      <>
        <Row>
          <Col span={24}>
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={this.handleToggle}
            >
              Add User
            </Button>
          </Col>
          {employees?.map((item,i) => {
            return (
              <Col key={item.id} span={8} style={{ padding: "15px" }}>
                <Card
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <Link to={`emp/${item.id}`}>
                      <EyeOutlined />
                    </Link>,
                    <EditOutlined
                      key="edit"
                      onClick={() => this.onEdit(item)}
                    />,
                    <Popconfirm
                    title={<>Are you sure to delete this user?</>}
                    onConfirm={() => this.confirm(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      key="ellipsis"
                      // onClick={() => this.props.deleteEmployee(item.id)}
                    />
                  </Popconfirm>
                    ,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: `#${this.getRandomColor()}`,
                          color: "white",
                          fontSize: "18px",
                        }}
                        size="large"
                      >
                        {item?.first_name.substring(0, 1).toUpperCase()}
                      </Avatar>
                    }
                    title={item.first_name}
                    description={item.email}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
        {this.addUser()}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    employees: state.userReducer.allEmployees,
  };
};

export default connect(mapStateToProps, {
  getAllEmployees,
  deleteEmployee,
  addEmployee,
  editEmployee,
})(DashboardComponent);

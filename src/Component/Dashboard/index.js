import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeFilled,
  TrophyFilled,
  PhoneFilled,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import DashboardPage from "../Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Action";
import { useParams } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState();
  const { pathname } = useLocation();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const {
    userReducer: { username, user_BG_Color },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (pathname.includes("/Dashboard/About")) {
      setSelectedKey("2");
    } else if (pathname.includes("/Dashboard/Contact")) {
      setSelectedKey("3");
    } else if (pathname.includes("/Dashboard/Home")) {
      setSelectedKey("1");
    } else {
      setSelectedKey();
    }
  }, [pathname]);

  const menu = (
    <Menu>
      <Menu.Item key={username}>
        <Link to=".">
          <UserOutlined /> {username}
        </Link>
      </Menu.Item>
      <Menu.Item key={'edituser'}>
        <Link to="edituser">
          <EditOutlined /> Edit User
        </Link>
      </Menu.Item>
      <Menu.Item key={'Logout'}>
        <Link to="/">
          <span onClick={() => dispatch({type: 'USER_LOG', payload: false})}><LogoutOutlined /> Logout</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="menu-link-active" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link to={`/user/${userId}/Dashboard`} style={{ color: "white" }}>
            {collapsed ? (
              <DashboardOutlined style={{ fontSize: "33px" }} />
            ) : (
              <span>
                <DashboardOutlined /> Dashboard
              </span>
            )}
          </Link>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeFilled />}>
            <NavLink to={`Home`}>Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<TrophyFilled />}>
            <NavLink to={`About`}>About</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<PhoneFilled />}>
            <NavLink to={`Contact`}>Contact US</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background collapsed-icon"
          style={{ padding: 0 }}
        >
          <span className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <span
            style={{ float: "right", fontSize: "16px", marginRight: "15px" }}
          >
            <span style={{ marginRight: "15px" }}>
              <UserOutlined />{" "}
              <span style={{ marginRight: "15px" }}>{username}</span>
            </span>

            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Avatar
                style={{
                  backgroundColor: user_BG_Color,
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                size="large"
              >
                {username.substring(0, 1).toUpperCase()}
              </Avatar>
            </Dropdown>
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <DashboardPage />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

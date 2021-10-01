import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { UploadOutlined, UserOutlined, BankOutlined } from "@ant-design/icons";
import "./Layout.css";
import { NavLink } from "react-router-dom";
const { Header, Sider } = Layout;
const HomeLayout = ({ header, children }) => {
  return (
    <Layout className="w-full h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="select-none text-2xl font-extralight text-white p-4">
          Road Rakshak
        </div>
        <div className="my-4 flex flex-col" theme="dark">
          <NavLink
            activeClassName="bg-indigo-600 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/myaccount"
          >
            <UserOutlined />
            &nbsp;My Account
          </NavLink>
          <NavLink
            activeClassName="bg-indigo-600 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/complaintDesk"
          >
            <UploadOutlined />
            &nbsp;Complaint Desk
          </NavLink>
          <NavLink
            activeClassName="bg-indigo-600 hover:text-white"
            className="flex items-center text-white font-light p-2 px-6"
            to="/postNews"
          >
            <BankOutlined />
            &nbsp;Post News
          </NavLink>
        </div>
      </Sider>
      <Layout>
        <Header className="uppercase select-none site-layout-sub-header-background flex justify-center items-center text-lg font-bold">
          {header}
        </Header>
        <div className="overflow-y-auto mx-8 my-6">
          <div
            style={{ minHeight: "88vh" }}
            className={`site-layout-background flex flex-col ${
              header.toLowerCase() === "complaint desk" ? "" : "justify-center"
            } items-center overflow-auto p-6`}
          >
            {children}
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;

import HomeLayout from "../components/HomeLayout/Layout";
import { Table, Tag, Space, notification } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const timestampToDate = (milliseconds) => {
  const dateObject = new Date(parseInt(milliseconds));
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};

const ComplaintDesk = () => {
  const [data, setData] = useState([]);
  const globalState = useSelector((state) => state);
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}api/v1/report/getReports`, {
        requestedBy: globalState.user._id,
      })
      .then((res) => {
        if (res.data.res) {
          setData(res.data.reports);
          console.log(data);
          notification.success({
            message: "Success",
            description: "Reports returned succesfully!",
          });
        } else {
          notification.error({
            message: "Error!",
            description: res.data.msg,
          });
        }
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);
  const columns = [
    {
      title: "Report ID",
      dataIndex: "reportId",
      key: "reportId",
      render: (reportId) => <Link to={`/report/${reportId}`}>{reportId}</Link>,
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => <span>{timestampToDate(timestamp)}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hurdle Type",
      key: "hurdleType",
      dataIndex: "hurdleType",
      render: (hurdle) => (
        <Tag color="red" key={hurdle}>
          {hurdle.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <Space
          className={`text-${record.isVerified ? "green" : "red"}-500`}
          size="middle"
        >
          {record.isVerified ? "Verified!" : "Not Verified!"}
        </Space>
      ),
    },
  ];
  return (
    <HomeLayout header={"Complaint Desk"}>
      <Table
        columns={columns}
        dataSource={data.map((d, i) => ({
          ...d,
          key: i,
        }))}
      />
    </HomeLayout>
  );
};

export default ComplaintDesk;

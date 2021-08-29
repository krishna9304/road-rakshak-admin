import { Checkbox, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout/Layout";
import { BACKEND_URL } from "../constants";
import { timestampToDate } from "./complaintDesk";
const Report = () => {
  const reportId = useParams().reportid;
  const [reportData, setReportData] = useState({});
  const [reportedBy, setReportedBy] = useState({});
  const [userVisible, setUserVisible] = useState(false);
  const [checked, setChecked] = useState(!reportData.isVerified);
  const [coord, setCoord] = useState({
    latitude: "",
    longitude: "",
  });
  const updateReport = () => {
    axios
      .post(`${BACKEND_URL}api/v1/report/updateReport`, {
        coord,
        checked,
        reportId,
      })
      .then((res) => {
        if (res.data.res) {
          notification.success({
            message: "Success",
            description: res.data.msg,
          });
        } else {
          res.data.errors.map((error) => {
            notification.error({
              message: "Error",
              description: error,
            });
          });
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}api/v1/report/getreport`, { id: reportId })
      .then((res) => {
        if (res.data.res) {
          setReportData(res.data.report);
          axios
            .post(`${BACKEND_URL}api/v1/user/getuser`, {
              id: res.data.report.reportedBy,
            })
            .then((res2) => {
              if (res2.data.res) {
                setReportedBy(res2.data.userData);
              } else {
                notification.error({
                  message: "Failed",
                  description: res2.data.errors[0],
                });
              }
            });
        } else {
          notification.error({
            message: "Failed",
            description: res.data.errors[0],
          });
        }
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);
  return (
    <HomeLayout header={`report ( id: ${reportId} )`}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full justify-center flex">
          <img
            className="max-w-lg w-full"
            src={reportData.siteImage}
            alt="reported site"
          />
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Reported by: </div>
          <div
            className="flex text-left w-1/2 font-bold hover:text-yellow-600 cursor-pointer"
            onClick={() => {
              setUserVisible(true);
            }}
          >
            {reportedBy.name}
          </div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Hurdle Type: </div>
          <div className="text-left w-1/2">{reportData.hurdleType}</div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Address: </div>
          <div className="text-left w-1/2">{reportData.address}</div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Description: </div>
          <div className="text-left w-1/2">{reportData.description}</div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Status: </div>
          <div
            className={`text-left w-1/2 text-${
              reportData.isVerified ? "green" : "red"
            }-500`}
          >
            {reportData.isVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Date: </div>
          <div className="text-left w-1/2">
            {timestampToDate(reportData.timestamp)}
          </div>
        </div>
        <div className="flex w-full shadow m-2 p-1">
          <div className="w-1/2 flex">Location coordinates: </div>
          <div className="flex flex-col text-left w-1/2">
            <div>
              Lat:{" "}
              {reportData.locationCoords !== undefined
                ? reportData.locationCoords.latitude
                : "Loading.."}
            </div>
            <div>
              Long:{" "}
              {reportData.locationCoords !== undefined
                ? reportData.locationCoords.longitude
                : "Loading.."}
            </div>
          </div>
        </div>
        <div className="flex w-full m-2 p-1">
          <div className="w-1/2 flex text-left p-1">
            Enter the correct location coordinates of the reported place
          </div>
          <div className="flex flex-col text-left w-1/2">
            <div className="m-1 text-xs">
              Latitude:
              <br />
              <input
                value={coord.latitude}
                onChange={(e) => {
                  setCoord({
                    ...coord,
                    latitude: e.target.value,
                  });
                }}
                className="bg-gray-200 p-1"
                type="text"
              />
            </div>
            <div className="m-1 text-xs">
              Longitude:
              <br />
              <input
                value={coord.longitude}
                onChange={(e) => {
                  setCoord({
                    ...coord,
                    longitude: e.target.value,
                  });
                }}
                className="bg-gray-200 p-1"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full mx-1 my-2 p-1">
          <div className="flex mr-2">
            <Checkbox
              disabled={reportData.isVerified}
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
          </div>
          <div className="text-left w-1/2 text-gray-500">
            {reportData.isVerified
              ? "Already Verified!"
              : "Click to verify this report"}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              updateReport();
            }}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white font-bold shadow-md rounded-md p-2"
          >
            Update report
          </button>
        </div>
      </div>
      <Modal
        onCancel={() => {
          setUserVisible(false);
        }}
        onOk={() => {
          setUserVisible(false);
        }}
        title="Details: "
        visible={userVisible}
      >
        <div>
          <div className="flex w-full shadow m-2 p-1">
            <div className="w-1/2 flex">Name: </div>
            <div className="text-left w-1/2">{reportedBy.name}</div>
          </div>
          <div className="flex w-full shadow m-2 p-1">
            <div className="w-1/2 flex">Email: </div>
            <div className="text-left w-1/2">{reportedBy.email}</div>
          </div>
          <div className="flex w-full shadow m-2 p-1">
            <div className="w-1/2 flex">Verification Status: </div>
            <div
              className={`text-left w-1/2 text-${
                reportedBy.isVerified ? "green" : "red"
              }-500`}
            >
              {reportedBy.isVerified ? "Verified" : "Not Verified"}
            </div>
          </div>
        </div>
      </Modal>
    </HomeLayout>
  );
};

export default Report;

import { notification, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout/Layout";
import { BACKEND_URL } from "../constants";

const PostNews = () => {
  const user = useSelector((state) => state.user);
  const [reference, setReference] = useState("");
  const [spin, setSpin] = useState(false);
  const [data, setData] = useState({
    postedBy: user._id,
    headline: "",
    references: [],
    description: "",
    picture: null,
  });
  let createNews = async () => {
    if (
      data.postedBy &&
      data.picture &&
      data.description &&
      data.references &&
      data.headline
    ) {
      const formData = new FormData();
      formData.append("picture", data.picture);
      formData.append("description", data.description);
      formData.append("headline", data.headline);
      formData.append("postedBy", user._id);
      formData.append("references", data.references);
      formData.append("timestamp", String(Date.now()));
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let res = await axios.post(
        `${BACKEND_URL}api/v1/news/createNews`,
        formData,
        config
      );
      setSpin(false);
      if (!res.data.res) {
        if(res.data.errors){
            res.data.errors.forEach((err) => {
            notification.error({
              message: "Failed",
              description: err,
            });
          });
          }else{
            notification.error({
              message: "Failed",
              description: res.data.msg
            })
          }
      } else {
        notification.success({
          message: "Success",
          description: res.data.msg,
        });
        setData({
          references: [],
          description: "",
          headline: "",
          postedBy: user._id,
          picture: null,
        });
      }
    } else {
      setSpin(false);
      notification.error({
        message: "Error",
        description: "Please fill all the details correctly!",
      });
    }
  };
  return (
    <HomeLayout header={"Post News"}>
      <div className="w-full flex justify-center items-center">
        <div className="flex w-full space-x-3">
          <div className="w-full max-w-2xl px-5 py-10 m-auto bg-white rounded-lg dark:bg-gray-800 shadow-xl  border-t-4 border-indigo-500">
            <div className="mb-6 text-lg font-bold text-center text-gray-800 dark:text-white">
              Post about what's happening in Rohtak
            </div>
            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div className="col-span-2">
                <div className="relative ">
                  <input
                    value={data.headline}
                    onChange={(e) => {
                      setData((d) => ({
                        ...d,
                        headline: e.target.value,
                      }));
                    }}
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Headline"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex gap-2">
                  <input
                    value={reference}
                    onChange={(e) => {
                      setReference(e.target.value);
                    }}
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Add References"
                  />
                  <button
                    onClick={() => {
                      setData((d) => ({
                        ...d,
                        references: [...d.references, reference],
                      }));
                      setReference("");
                    }}
                    className="bg-green-500 hover:bg-green-600 duration-300 px-4 rounded-lg text-white font-bold shadow-md border"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="w-full flex-wrap flex gap-2">
                {data.references.map((refer, idx) => {
                  return (
                    <span
                      key={idx}
                      className="border-dashed border border-gray-500 rounded-sm px-1"
                    >
                      {refer}
                    </span>
                  );
                })}
              </div>
              <div className="col-span-2">
                <textarea
                  value={data.description}
                  onChange={(e) => {
                    setData((d) => ({
                      ...d,
                      description: e.target.value,
                    }));
                  }}
                  style={{ minHeight: "3rem" }}
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Description"
                  rows="5"
                  cols="40"
                />
              </div>
              <div className="col-span-2">
                <div>
                  <label for="siteimage">Any relatable image</label>
                  <input
                    onChange={(e) => {
                      setData({
                        ...data,
                        picture: e.target.files[0],
                      });
                    }}
                    name="image"
                    accept="image/*"
                    type="file"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => {
                    setSpin(true);
                    createNews();
                  }}
                  className="py-2 px-4  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Post {spin ? <Spin /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PostNews;

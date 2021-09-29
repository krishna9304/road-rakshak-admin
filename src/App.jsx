import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "./constants";
import { setAuth, setUser } from "./redux/actions/actions";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import MyAccount from "./pages/myaccount";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import VerifyUser from "./pages/verifyuser";
import NotVerified from "./pages/notverified";
import { useCookies } from "react-cookie";
import ComplaintDesk from "./pages/complaintDesk";
import PostNews from "./pages/postNews";
import Report from "./pages/report";

function App() {
  let [authDone, setAuthDone] = useState(false);
  const [cookies] = useCookies(["jwtAdmin"]);
  let dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let authUser = () => {
    if (document.cookie) {
      let token;
      token = cookies.jwtAdmin;
      if (token) {
        axios
          .post(`${BACKEND_URL}api/v1/adminAuth/verifyToken`, {
            token: token,
          })
          .then((res) => {
            try {
              if (res.data.res) {
                document.cookie = res.data.newToken;
                dispatch(setAuth(true));
                dispatch(setUser(res.data.userData));
                setAuthDone(true);
                notification.success({
                  message: "Success",
                  description: res.data.msg,
                });
              } else {
                dispatch(setAuth(false));
                dispatch(setUser(null));
                setAuthDone(true);
              }
            } catch (err) {
              dispatch(setAuth(false));
              dispatch(setUser(null));
              setAuthDone(true);
              console.log(err);
            }
          })
          .catch((err) => console.log(err));
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        setAuthDone(true);
      }
    } else {
      dispatch(setAuth(false));
      dispatch(setUser(null));
      setAuthDone(true);
    }
  };
  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  if (!authDone) {
    return (
      <div className="uppercase w-full h-screen flex justify-center items-center text-center text-3xl font-bold">
        loading...&nbsp; <LoadingOutlined />
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {globalState.auth ? <MyAccount /> : <SignIn />}
          </Route>
          <Route path="/signup">
            {globalState.auth ? <MyAccount /> : <SignUp />}
          </Route>
          <Route path="/signin">
            {globalState.auth ? <MyAccount /> : <SignIn />}
          </Route>
          <Route path="/myaccount">
            {globalState.auth ? <MyAccount /> : <SignIn />}
          </Route>
          <Route path="/complaintDesk">
            {globalState.auth ? (
              globalState.user.isVerified ? (
                <ComplaintDesk />
              ) : (
                <NotVerified />
              )
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path="/postNews">
            {globalState.auth ? <PostNews /> : <SignIn />}
          </Route>
          <Route path="/verifyuser/:token">
            <VerifyUser />
          </Route>
        </Switch>
        <Route path="/report/:reportid">
          {globalState.auth ? <Report /> : <SignIn />}
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

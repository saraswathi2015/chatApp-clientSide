import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setOnlineUser,
  setsocketConnection,
  setUser,
} from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "./../assets/logo.png";
import io from "socket.io-client";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("home user", user);

  const fetchUserDetails = async (token) => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));
      console.log("current user details", response);

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  console.log("home location", location);

  const basePath = location.pathname === "/";

  // socket connection
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log("socket data", data);
      dispatch(setOnlineUser(data)); //data send to redux store ...store in onlineuser
    });

    dispatch(setsocketConnection(socketConnection)); //data send to redux store ...store in socketConnection

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      {/* <section className={`bg-white ${!basePath && "hidden"}`}> */}
      <section className={`bg-white `}>
        <Sidebar />
      </section>

      {/* message component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex "
        }`}
      >
        <div>
          <img src={logo} width={200} alt="logo" />
        </div>
        <p className="text-lg mt-2">Select user to send message</p>
      </div>
    </div>
  );
};

export default Home;

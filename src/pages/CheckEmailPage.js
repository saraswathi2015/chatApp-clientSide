import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      console.log("response", response);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });
      }
      navigate("/password", {
        state: response?.data?.data,
      });
      console.log("email-response", response, data);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }

    // console.log("data", data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto ">
        <div className="w-fit mx-auto mb-2 ">
          <HiUserCircle size={70} />
        </div>
        <h3>Welcome to Chat app!</h3>
        <form className="grid gap-3 mt-2 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-primary text-lg px4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white tracking-wider ">
            Let's Go
          </button>
        </form>
        <p className="my-3 text-center ">
          New User ?
          <Link
            to={"/register"}
            className="hover:text-primary hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const location = useLocation();
  const [data, setData] = useState({
    password: "",
    userId: location?.state?._id,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("location", location.state);

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
    try {
      const response = await axios({
        method: "post",
        url: URL,
        data,
        withCrendentials: true,
      });
      console.log(" password response", response);
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        console.log(response?.data?.token);
        console.log(response.data);

        setData({
          password: "",
        });
        const token = response?.data?.token;
        console.log(token);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
      }
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }

    // console.log("data", data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto ">
        <div className="w-fit mx-auto mb-2 flex flex-col justify-center items-center">
          {/* <HiUserCircle size={70} /> */}
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg mt-1 ">
            {location?.state?.name}
          </h2>
        </div>

        <form className="grid gap-3 mt-2 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-primary text-lg px4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white tracking-wider ">
            Login
          </button>
        </form>
        <p className="my-3 text-center ">
          <Link
            to={"/forgot-password"}
            className="hover:text-primary hover:underline font-semibold"
          >
            Forgot Password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;

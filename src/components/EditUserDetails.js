import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user.name,
    profile_pic: user.profile_pic,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => {
      return { ...prev, ...user };
    });
  }, [user]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
    console.log(uploadPhoto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response = await axios({
        method: "post",
        url: URL,
        data: data,
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      console.log(response?.data);

      if (response.data.success) {
        dispatch(setUser(response?.data?.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-5 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary border"
            />
          </div>

          <div>
            Photo
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor="profile_pic">
                <div className="font-semibold ">Change Photo</div>
              </label>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPhoto}
                id="profile_pic"
              />
            </div>
          </div>

          <Divider />

          <div className="flex gap-2 w-fit ml-auto ">
            <button
              onClick={onClose}
              className="border border-primary px-4 py-1 text-primary rounded hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border border-primary px-4 py-1 bg-primary text-white rounded hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditUserDetails;

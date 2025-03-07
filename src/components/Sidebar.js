import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import Divider from "./Divider";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOPenSearchUser] = useState(false);

  // console.log(allUser);

  return (
    <div className="w-full h-full grid grid-cols-[50px,1fr] bg-white">
      <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded ${
                isActive && "bg-slate-400"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded"
            onClick={() => setOPenSearchUser(true)}
            title="add friend"
          >
            <FaUserPlus size={25} />
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={30}
              height={30}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded mt-3"
            title="logout"
          >
            <span className="-ml-2">
              <TbLogout2 size={30} height={40} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-lg font-bold p-4  text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className=" h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div>
              <div className="flex justify-center items-center my-4 text-slate-500 mt-10">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
        </div>
      </div>
      {/**edit user details */}

      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/** search use*/}
      {openSearchUser && (
        <SearchUser onClose={() => setOPenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;

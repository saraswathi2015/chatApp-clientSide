import React from "react";
import { HiUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
// import { setOnlineUser } from "../redux/userSlice";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  //import onlineuser(id) from redux store
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  //saraswathi muthukumar
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-amber-600",
  ];

  const randomNumber = Math.floor(Math.random() * 6);

  //   console.log(randomNumber);

  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className={`text-slate-800 rounded-full text-xl font-bold relative  `}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-xl ${bgColor[randomNumber]} `}
        >
          {avatarName}
        </div>
      ) : (
        <HiUserCircle size={width} />
      )}

      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full">
          {" "}
        </div>
      )}
    </div>
  );
};

export default Avatar;

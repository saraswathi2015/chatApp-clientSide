import React from "react";
import logo from "./../assets/logo.png";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-2 h-23 shadow-md bg-white">
        <img src={logo} alt="logo" width={200} height={50} />
      </header>
      {children}
    </>
  );
};

export default AuthLayouts;

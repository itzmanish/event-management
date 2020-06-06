import React from "react";
import Header from "./header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen-lg lg:mx-auto text-black my-8 mx-4">
      <Header />
      {children}
      <ToastContainer
        style={{
          position: "absolute",
          right: "1rem",
          top: "6rem",
        }}
        autoClose={3000}
        bodyClassName={"text-white text-center"}
        closeButton={false}
      />
    </div>
  );
};

export default Layout;

import React from "react";
import Sidebar from "../../sidebar/index";
import "./Home.css"
import Header from "../../header";
const HomeLayout = () => {
  return (
    <div className="home-layout-wrapper w-[100%] h-[100%] bg-[blue] ">
      <div className="header-container "><Header/></div>
      <div className="sidebar-container "><Sidebar/></div>
      <div className="main-container ">main content</div>
    </div>
  );
};

export default HomeLayout;

import React from "react";

const HomeLayout = () => {
  return (
    <div className="w-[100%] h-[100%] bg-[blue] flex flex-row ">
      <div className="sidebar-container w-[20%] h-[100%] bg-[red]">sidebar</div>
      <div className="main-container w-[80%] h-[100%] bg-[purple]">main content</div>
    </div>
  );
};

export default HomeLayout;

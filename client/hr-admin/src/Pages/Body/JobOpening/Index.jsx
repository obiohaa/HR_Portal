import React from "react";
import JobOpen from "./JobOpen";
import SideBarNav from "../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <JobOpen />
      </div>
    </div>
  );
};

export default Index;

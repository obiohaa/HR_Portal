import React from "react";
import "../adminUser.css";
import Employee from "./employee";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <Employee />
      </div>
    </div>
  );
};

export default Index;

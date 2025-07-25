import React from "react";
import "../adminUser.css";
import EmployeeNDA from "./EmployeeNDA";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <EmployeeNDA />
      </div>
    </div>
  );
};

export default Index;

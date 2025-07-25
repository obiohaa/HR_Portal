import React from "react";
import "../adminUser.css";
import EmployeeNOK from "./EmployeeNOK";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <EmployeeNOK />
      </div>
    </div>
  );
};

export default Index;

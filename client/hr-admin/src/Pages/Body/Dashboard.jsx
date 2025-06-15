import React from "react";
import SideBarNav from "../SideBarNav/SideBarNav";
import EmployeeMainDash from "../Body/Dashboard/EmployeeDash/EmployeeMainDash";

const Dashboard = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <EmployeeMainDash />
      </div>
    </div>
  );
};
export default Dashboard;

import React from "react";
import "../Dashboard.css";

import AdminDash from "./AdminMainDash";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <AdminDash />
      </div>
    </div>
  );
};

export default Index;

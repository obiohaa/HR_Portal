import React from "react";
import "../adminUser.css";
import AdminJob from "./AdminJobOpening";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <AdminJob />
      </div>
    </div>
  );
};

export default Index;

import React from "react";
import "../adminUser.css";
import AdminGua from "./AdminGua";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <AdminGua />
      </div>
    </div>
  );
};

export default Index;

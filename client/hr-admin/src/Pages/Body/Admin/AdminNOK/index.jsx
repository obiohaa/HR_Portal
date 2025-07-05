import React from "react";
import "../adminUser.css";
import AddAdmin from "./AddAdmin";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <AddAdmin />
      </div>
    </div>
  );
};

export default Index;

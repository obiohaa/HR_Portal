import React from "react";
import "../profile.css";
import NOK from "./NOK";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <NOK />
      </div>
    </div>
  );
};

export default index;

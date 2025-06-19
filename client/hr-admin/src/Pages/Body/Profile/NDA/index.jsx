import React from "react";
import "../profile.css";
import NDA from "./NDA";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <NDA />
      </div>
    </div>
  );
};
export default index;

import React from "react";
import "../profile.css";
import BioData from "./BioData";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <BioData />
      </div>
    </div>
  );
};
export default index;

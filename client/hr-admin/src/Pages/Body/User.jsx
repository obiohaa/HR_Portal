import React from "react";
import "./body.css";
import SideBarNav from "../SideBarNav/SideBarNav";
import { Tracker, BioData, Guarantor } from "./User/Index.jsx";

const User = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <Tracker />
      </div>
    </div>
  );
};
export default User;

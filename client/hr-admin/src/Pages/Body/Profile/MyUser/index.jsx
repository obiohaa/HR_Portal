import React from "react";
import "../profile.css";
import MyUser from "./MyUser";
import SideBarNav from "../../../SideBarNav/SideBarNav";

const Index = () => {
  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <MyUser />
      </div>
    </div>
  );
};
export default Index;

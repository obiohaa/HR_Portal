import React from "react";
import "../Dashboard.css";
import { FaChessKing, FaUsers, FaFileCircleXmark, FaUserSecret, FaUser } from "react-icons/fa6";

const EmployeeMainDash = () => {
  return (
    <div className="employeeDashContainer">
      <div className="employeeDashBody">
        <div className="employeeDashSingle dashOne">
          <span className="toolTipText">User Bio Data</span>
          <FaUser className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
        <div className="employeeDashSingle dashTwo">
          <span className="toolTipText">Next of Kin</span>
          <FaUsers className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
        <div className="employeeDashSingle dashThree">
          <span className="toolTipText">Guarantor One</span>
          <FaUserSecret className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
        <div className="employeeDashSingle dashFour">
          <span className="toolTipText">Guarantor Two</span>
          <FaUserSecret className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
        <div className="employeeDashSingle dashFive">
          <span className="toolTipText">Non Disclosure Agreement</span>
          <FaFileCircleXmark className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
        <div className="employeeDashSingle dashSix">
          <span className="toolTipText">HR Admin</span>
          <FaChessKing className="dashIcon" />
          <div className="divider"></div>
          <div className="dashCount">0</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMainDash;

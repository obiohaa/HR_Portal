import React, { useState } from "react";
import UserShell from "./UserShell";
import { FaUserPlus, FaUsers, FaFileCircleXmark, FaUserSecret } from "react-icons/fa6";
import Progress from "./Progress";

const Tracker = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <div className="trackerBody">
      <div className="trackerContainer">
        <div className="progressContainer">
          <Progress totalSteps={totalSteps} step={step} />
          <div className={`${step >= 1 ? "circle active" : "circle"}`}>
            <FaUserPlus className="user_icon" />
          </div>
          <div className={`${step >= 1 ? "bioData on" : "bioData"}`}>Bio Data</div>
          <div className={`${step >= 2 ? "circle active" : "circle"}`}>
            <FaUsers className="user_icon" />
          </div>
          <div className={`${step >= 2 ? "nextOfKin on" : "nextOfKin"}`}>Next of Kin</div>
          <div className={`${step >= 3 ? "circle active" : "circle"}`}>
            <FaUserSecret className="user_icon" />
          </div>
          <div className={`${step >= 3 ? "guarantor on" : "guarantor"}`}>Guarantor</div>
          <div className={`${step >= 4 ? "circle active" : "circle"}`}>
            <FaFileCircleXmark className="user_icon" />
          </div>
          <div className={`${step >= 4 ? "nda on" : "nda"}`}>NDA</div>
        </div>
      </div>
      <div className="formsContainer">
        <UserShell step={step} totalSteps={totalSteps} setStep={setStep} />
      </div>
    </div>
  );
};
export default Tracker;

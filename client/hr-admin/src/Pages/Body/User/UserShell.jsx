import React from "react";
import Next_of_kin from "./Next_of_kin";
import Guarantor from "./Guarantor";
import BioData from "./BioData";
import NDA from "./NDA";

const UserShell = ({ step, totalSteps, setStep }) => {
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <div className="formsContainerBody">
        <BioData />
      </div>
      <div className="btns">
        <div className={`${step <= 1 ? "disabled" : "btn"}`} onClick={handlePrev}>
          Prev
        </div>
        <div className={`${step === totalSteps ? "disabled" : "btn"}`} onClick={handleNext}>
          Next
        </div>
      </div>
    </div>
  );
};
export default UserShell;

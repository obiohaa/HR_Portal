import React, { useState } from "react";
import BioData from "./BioData";
import Next_of_kin from "./Next_of_kin";
import Guarantor from "./Guarantor";
import NDA from "./NDA";
import PageLoading from "../../../Components/Checks/PageLoading";
import { FaUserPlus, FaUsers, FaFileCircleXmark, FaUserSecret } from "react-icons/fa6";
import Progress from "./Progress";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../Utils/axiosFetch";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../Context/userContext";

const Tracker = () => {
  const { setUserStepState } = useGlobalContext();
  const [steps, setSteps] = useState(null);
  const totalSteps = 4;

  const { isLoading } = useQuery({
    queryKey: ["bioDataKey"],
    retryOnMount: true, //do not retry on mount
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/userStepState");
      const { currentStep } = data.currentUserStepState;
      setSteps(currentStep);
      setUserStepState(data.currentUserStepState);
      // console.log(data);
      return data;
    },
    onError: (error) => {
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      });
    },
  });

  if (isLoading || steps == null) {
    <PageLoading />;
  }

  return (
    <div className="trackerBody">
      <div className="trackerContainer">
        <div className="progressContainer">
          <Progress totalSteps={totalSteps} steps={steps} setSteps={setSteps} />
          <div className={`${steps >= 1 ? "circle active" : "circle"}`}>
            <FaUserPlus className="user_icon" />
          </div>
          <div className={`${steps >= 1 ? "bioData on" : "bioData"}`}>Bio Data</div>

          {/*  */}
          <div className={`${steps >= 2 ? "circle active" : "circle"}`}>
            <FaUsers className="user_icon" />
            <div className={`${steps >= 2 ? "nextOfKin on" : "nextOfKin"}`}>Next of Kin</div>
          </div>

          {/*  */}
          <div className={`${steps >= 3 ? "circle active" : "circle"}`}>
            <FaUserSecret className="user_icon" />
            <div className={`${steps >= 3 ? "nda on" : "nda"}`}>NDA</div>
          </div>

          {/*  */}
          <div className={`${steps >= 4 ? "circle active" : "circle"}`}>
            <FaFileCircleXmark className="user_icon" />
            <div className={`${steps >= 4 ? "guarantor on" : "guarantor"}`}>Guarantor</div>
          </div>
        </div>
      </div>
      <div className="formsContainer">
        {steps === 1 ? (
          <BioData />
        ) : steps === 2 ? (
          <Next_of_kin />
        ) : steps === 3 ? (
          <NDA />
        ) : steps === 4 ? (
          <Guarantor />
        ) : (
          <PageLoading />
        )}
      </div>
    </div>
  );
};
export default Tracker;

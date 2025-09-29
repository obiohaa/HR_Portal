import React from "react";
import "../Dashboard.css";
import PageLoading from "../../../../Components/Checks/PageLoading";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import { useGlobalContext } from "../../../../Context/userContext";
import { FaChessKing, FaUsers, FaFileCircleXmark, FaUserSecret, FaUser } from "react-icons/fa6";

const EmployeeMainDash = () => {
  const { userStepState, saveUser, setUserStepState } = useGlobalContext();
  // console.log(user);

  // Fetch the current user data
  useQuery({
    queryKey: ["currentUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/showMe");
      saveUser(data.user);
      console.log(data.user);
      return data;
    },
    onError: () => {},
  });

  const { isLoading: stepLoading } = useQuery({
    queryKey: ["bioDataKey"],
    refetchOnMount: true,
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/userStepState");
      // const { currentStep } = data.currentUserStepState;
      setUserStepState(data.currentUserStepState);
      console.log(data);
      return data;
    },
    onError: () => {},
  });

  if (stepLoading) {
    return <PageLoading />;
  }

  return (
    <div className="employeeDashContainer">
      <div className="employeeDashBody">
        <div
          className={
            userStepState && userStepState.completedStep >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Bio Data {userStepState && userStepState.completedStep >= 1 ? "Completed" : ""}
          </span>
          <FaUser
            className={
              userStepState && userStepState.completedStep >= 1
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.completedStep >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.completedStep >= 1 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.completedStep >= 1 ? "1" : "0"}
          </div>
        </div>
        <div
          className={
            userStepState && userStepState.completedStep >= 2
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Next of Kin {userStepState && userStepState.completedStep >= 2 ? "Completed" : ""}
          </span>
          <FaUsers
            className={
              userStepState && userStepState.completedStep >= 2
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.completedStep >= 2 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.completedStep >= 2 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.completedStep >= 2 ? "1" : "0"}
          </div>
        </div>
        <div
          className={
            userStepState && userStepState.guarantorStep >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Guarantor One {userStepState && userStepState.guarantorStep >= 1 ? "Completed" : ""}
          </span>
          <FaUserSecret
            className={
              userStepState && userStepState.guarantorStep >= 1
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.guarantorStep >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.guarantorStep >= 1 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.guarantorStep >= 1 ? "1" : "0"}
          </div>
        </div>
        <div
          className={
            userStepState && userStepState.guarantorStep === 2
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Guarantor Two {userStepState && userStepState.guarantorStep === 2 ? "Completed" : ""}
          </span>
          <FaUserSecret
            className={
              userStepState && userStepState.guarantorStep === 2
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.guarantorStep === 2 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.guarantorStep === 2 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.guarantorStep === 2 ? "1" : "0"}
          </div>
        </div>
        <div
          className={
            userStepState && userStepState.completedStep >= 3
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            N.D.A {userStepState && userStepState.completedStep >= 3 ? "Signed" : ""}
          </span>
          <FaFileCircleXmark
            className={
              userStepState && userStepState.completedStep >= 3
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.completedStep >= 3 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.completedStep >= 3 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.completedStep >= 3 ? "1" : "0"}
          </div>
        </div>
        {/* {user && user.role === "admin" && (
          <div
            className={
              userStepState && userStepState.completedStep >= 5
                ? "employeeDashSingle dashColoured"
                : "employeeDashSingle dashNotColoured"
            }>
            <span className="toolTipText">
              Admin {userStepState && userStepState.completedStep >= 5 ? "Completed" : ""}
            </span>
            <FaChessKing
              className={
                userStepState && userStepState.completedStep >= 5
                  ? "dashIconColoured"
                  : "dashIconNotColoured"
              }
            />
            <div
              className={
                userStepState && userStepState.completedStep >= 5 ? "dividerColoured" : "divider"
              }></div>
            <div
              className={
                userStepState && userStepState.completedStep >= 5
                  ? "dashCountColoured"
                  : "dashCount"
              }>
              {userStepState && userStepState.completedStep >= 5 ? "1" : "0"}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EmployeeMainDash;

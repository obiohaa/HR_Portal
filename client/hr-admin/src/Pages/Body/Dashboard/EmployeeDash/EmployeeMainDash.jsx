import React from "react";
import "../Dashboard.css";
import { useGlobalContext } from "../../../../Context/userContext";
import { FaChessKing, FaUsers, FaFileCircleXmark, FaUserSecret, FaUser } from "react-icons/fa6";

const EmployeeMainDash = () => {
  const { userStepState, user } = useGlobalContext();
  // console.log(user);

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
            userStepState && userStepState.completedStep >= 3
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Guarantor One {userStepState && userStepState.completedStep >= 3 ? "Completed" : ""}
          </span>
          <FaUserSecret
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
        <div
          className={
            userStepState && userStepState.completedStep >= 3
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            Guarantor Two {userStepState && userStepState.completedStep >= 3 ? "Completed" : ""}
          </span>
          <FaUserSecret
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
        <div
          className={
            userStepState && userStepState.completedStep >= 4
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            N.D.A {userStepState && userStepState.completedStep >= 4 ? "Signed" : ""}
          </span>
          <FaFileCircleXmark
            className={
              userStepState && userStepState.completedStep >= 4
                ? "dashIconColoured"
                : "dashIconNotColoured"
            }
          />
          <div
            className={
              userStepState && userStepState.completedStep >= 4 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              userStepState && userStepState.completedStep >= 4 ? "dashCountColoured" : "dashCount"
            }>
            {userStepState && userStepState.completedStep >= 4 ? "1" : "0"}
          </div>
        </div>
        {user && user.role === "admin" && (
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
        )}
      </div>
    </div>
  );
};

export default EmployeeMainDash;

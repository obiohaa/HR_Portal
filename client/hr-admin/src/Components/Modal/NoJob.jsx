import React from "react";
import "../component.css";
import BadMark from "../Checks/BadMark";
import { useGlobalContext } from "../../Context/userContext";

const NoJob = () => {
  const { closeModal } = useGlobalContext();

  return (
    <div
      className="profile-modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <BadMark />
              <p>No job posted currently. Please contact your HR Admin for more information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoJob;

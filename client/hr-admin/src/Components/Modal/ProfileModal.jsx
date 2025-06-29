import React from "react";
import "../component.css";
import BadMark from "../Checks/BadMark";
import { useGlobalContext } from "../../Context/userContext";

const ProfileModal = () => {
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
              <p>
                This form has not been filled, submitted or updated, if you intend to view or edit
                this form, please fill the form from E-Form before viewing or editing it here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

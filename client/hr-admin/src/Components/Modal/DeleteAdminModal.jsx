import React from "react";
import "../component.css";
import { useGlobalContext } from "../../Context/userContext";

const DeleteAdminModal = (id) => {
  console.log(id);
  const { closeModal, closeDelModal } = useGlobalContext();
  // console.log(userStepState);
  return (
    <div className="infoModal-container">
      <div className="infoModal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div class="container">
                <h3>Notice!!!</h3>
                <h4 className="noticeWords">Are you sure you want to delete 30 Users?</h4>
              </div>
              <div className="noticeButton">
                <button type="submit" className="btn btnLeft" onClick={closeModal}>
                  DELETE
                </button>
                <button type="submit" className="btn btnLeft" onClick={closeDelModal}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdminModal;

import React from "react";
import "../component.css";
import BadMark from "../Checks/BadMark";
import { useGlobalContext } from "../../Context/userContext";

const NoData = () => {
  const { closeModal } = useGlobalContext();

  return (
    <div
      className="table-modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <BadMark />
              <p>
                No record found here. Go to page 1 or contact your IT Admin for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoData;

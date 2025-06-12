import React from "react";
import "./component.css";
import { useGlobalContext } from "../Context/userContext";

const InfoModal = () => {
  const { closeModal } = useGlobalContext();
  // console.log(userStepState);
  return (
    <div className="infoModal-container">
      <div className="infoModal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div class="container">
                <h3>Guarantor Declaration</h3>

                <p class="intro">
                  I hereby guarantee the due performance by the Employee of the Contract.
                </p>

                <p class="intro">I understand that:</p>

                <ol>
                  <li className="guarantorList">
                    I will indemnify the Employer against all losses, damages, costs, expenses, or
                    otherwise incurred by reason of any default on the part of the Employee.
                  </li>
                  <li className="guarantorList">
                    I will not be discharged or released from this guarantee except with the written
                    consent of the Employer.
                  </li>
                  <li className="guarantorList">
                    I will reimburse the Employer for any legal fees and costs incurred in enforcing
                    this Guarantee.
                  </li>
                </ol>
              </div>
              <button type="submit" className="btn btnLeft" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

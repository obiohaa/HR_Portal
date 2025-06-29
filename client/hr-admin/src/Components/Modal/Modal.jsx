import React from "react";
import "../component.css";
import CheckMark from "../Checks/CheckMark";
import { toast } from "react-toastify";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../Context/userContext";

const Modal = () => {
  const { userStepState, closeModal } = useGlobalContext();
  const queryClient = useQueryClient();

  //next page mutation
  const { mutate: nextPage } = useMutation({
    mutationFn: async (nextPage) => axiosFetch.post("/users/updateUserNextStepState", nextPage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
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

  //previous page mutation
  const { mutate: prevPage } = useMutation({
    mutationFn: async (prevPage) => axiosFetch.post("/users/updateUserPrevStepState", prevPage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
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

  //Initiate next user step
  const nextUserStep = (event) => {
    event.preventDefault();
    nextPage();
  };

  //Initiate previous user step
  const prevUserStep = (event) => {
    event.preventDefault();
    prevPage();
  };
  // console.log(userStepState);
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <CheckMark />
              {userStepState && userStepState.currentStep === 1 ? (
                <p>
                  This form has been filled and submitted, if you intend to view or edit your Bio
                  Data form, click here: or go to your user profile to view and edit your Bio Data
                  form.
                </p>
              ) : userStepState.currentStep === 2 ? (
                <p>
                  This form has been filled and submitted, if you intend to view or edit your Next
                  of Kin form, click here: or go to your user profile to view and edit your Next of
                  Kin form.
                </p>
              ) : userStepState.currentStep === 3 ? (
                <p>
                  This form has been filled and submitted, if you intend to view or edit your
                  Guarantor's form, form, please contact your HR Admin for assistance
                </p>
              ) : (
                <p>
                  This agreement has been checked and submitted, if you intend to view or read the
                  NDA form, click here: or go to your user profile to view and read the NDA form
                  form.
                </p>
              )}
            </div>
          </div>
          <div className="modalButton">
            <button
              className="btn"
              onClick={prevUserStep}
              disabled={userStepState && userStepState.currentStep === 1}>
              Prev
            </button>
            <button
              className="btn"
              onClick={nextUserStep}
              disabled={userStepState && userStepState.currentStep === 4}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

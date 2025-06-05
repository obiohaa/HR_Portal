import React from "react";
import "./component.css";
import CheckMark from "./CheckMark";
import { toast } from "react-toastify";
import { axiosFetch } from "../Utils/axiosFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../Context/userContext";

const Modal = () => {
  const { userStepState, closeModal } = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutate: bioDataUser, isLoading } = useMutation({
    mutationFn: async (bioDataUser) => axiosFetch.post("/users/bioData", bioDataUser),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
      toast.success(data.data.steps.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
      // reset();
      // setFileName(null);
      // setStep(data.data.steps.nextStep);
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

  //   console.log(userStepState);
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
              {/* <h3>Notice!!!</h3> */}
              <CheckMark />
              <p>
                This form has been filled and submitted, if you intend to view or edit your Bio Data
                form, click here: or go to your user profile to view and edit your Bio Data form.
              </p>
            </div>
          </div>
          <div className="modalButton">
            <button className="btn">Prev</button>
            <button className="btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

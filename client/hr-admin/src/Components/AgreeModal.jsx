import React from "react";
import "./component.css";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetch } from "../Utils/axiosFetch";

const AgreeModal = () => {
  const { closeModal } = useGlobalContext();
  // console.log(userStepState);

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: finalNDA, isLoading } = useMutation({
    mutationFn: async (finalNDA) => axiosFetch.post("/users/finalAgreement", finalNDA),
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
      //   reset();
      //   setFileName(null);
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

  const onSubmit = async () => {
    try {
      console.log("click");
      finalNDA({ finalAgreement: true });
      closeModal();
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      <div className="infoModal">
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div class="container">
                <h3>General Declaration</h3>

                <p class="intro">
                  By clicking on the button "Send", I here by agree that the information given so
                  far in the HR Portal is correct and if it is discovered that any information given
                  is false then my employment with the company is null.
                </p>
              </div>
              <button type="submit" className="btn btnLeft" onClick={onSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreeModal;

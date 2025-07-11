import React from "react";
import "../component.css";
import { axiosFetch } from "../../Utils/axiosFetch";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../Context/userContext";
import PageLoading from "../../Components/Checks/PageLoading";

const DeleteAdminModal = ({ deletedItem }) => {
  console.log(deletedItem);
  const { closeDelModal } = useGlobalContext();

  // SEND TO DATABASE
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: async (deleteUser) =>
      axiosFetch.delete("/admins/deleteUser", { data: { ids: deleteUser } }),
    onSuccess: (data) => {
      closeDelModal();
      queryClient.invalidateQueries({ queryKey: ["registerAdmin"] });
      toast.success(data.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
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
  //END SEND TO DATABASE

  const sendDelete = () => {
    console.log(deletedItem);
    deleteUser(deletedItem);
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
              <div className="container">
                <h3>Notice!!!</h3>
                {deletedItem.length > 1
                  ? `You are about to delete ${deletedItem.length} items, if you are sure of this action, click on the delete button else cancel button`
                  : `You are about to delete ${deletedItem.length} item, if you are sure of this action, click on the delete button else cancel button`}
              </div>
              <div className="noticeButton">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btnLeft"
                  onClick={sendDelete}>
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

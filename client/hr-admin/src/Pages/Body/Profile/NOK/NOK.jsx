import React from "react";
import { FaDownload } from "react-icons/fa6";
import EditNOKModal from "../../../../Components/Modal/EditNOKModal";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/Modal/ProfileModal";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import PageLoading from "../../../../Components/Checks/PageLoading";

const NOK = () => {
  const { userStepState, openModal, isModalOpen } = useGlobalContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["nokUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/users/getSingleNOK`);
      console.log(data);
      console.log(data.userNOK);
      return data;
    },
  });

  console.log(error);
  console.log(data);

  if (isLoading) {
    <PageLoading />;
  }

  return (
    <div className="bioDataProfileContainer">
      {userStepState && userStepState.completedStep <= 1 ? (
        <ProfileModal />
      ) : (
        <div>
          {isModalOpen && <EditNOKModal userNOK={data.userNOK} />}
          <div className="bioDataProfileMainBody">
            <div className="bioDataProfileBody">
              <div className="singleProfile">
                <p className="profileLabel">First Name</p>
                <h4 className="profileName">
                  {data && data.userNOK ? data.userNOK.nextOfKinFirstName : "First Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Last Name</p>
                <h4 className="profileName">
                  {data && data.userNOK ? data.userNOK.nextOfKinLastName : "Last Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Relationship</p>
                <h4 className="profileName">
                  {data && data.userNOK ? data.userNOK.nextOfKinRelationship : "Relationship"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Gender</p>
                <h4 className="profileName">
                  {data && data.userNOK ? data.userNOK.gender : "Gender"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">House Address</p>
                <h4 className="profileName">
                  {data && data.userNOK
                    ? data.userNOK.houseAddress.substring(0, 25) + "..."
                    : "Gender"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Phone Number</p>
                <h4 className="profileName">
                  {data && data.userNOK ? data.userNOK.phoneNumber : "Phone Number"}
                </h4>
                <div className="profileLine"></div>
              </div>
            </div>
          </div>
          <div className="btns profileBtn">
            <button
              className="btn"
              onClick={() => window.open("http://localhost:5173/pdfPagenok", "_blank")}>
              Download
            </button>
            <button className="btn" onClick={openModal}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NOK;

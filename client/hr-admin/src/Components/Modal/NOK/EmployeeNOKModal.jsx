import React, { useState } from "react";
import "../../component.css";
import { FaDownload, FaX } from "react-icons/fa6";
// import { toast } from "react-toastify";
import { useGlobalContext } from "../../../Context/userContext";
import ProfileModal from "../ProfileModal";
import EditBioDataModal from "../EditBioDataModal";
// import { useQuery } from "@tanstack/react-query";
// import { axiosFetch } from "../../../Utils/axiosFetch";
import PageLoading from "../../Checks/PageLoading";

const EmployeeNOKModal = ({ viewUser }) => {
  console.log(viewUser);
  const { closeViewModal } = useGlobalContext();
  const [updateData] = useState(viewUser);

  // const { data, isLoading, error, isFetching } = useQuery({
  //   queryKey: ["adminBioDataKey"],
  //   retryOnMount: true, //do not retry on mount
  //   refetchOnWindowFocus: true, //do not refetch on window focus
  //   refetchOnReconnect: true, //do not refetch on reconnect
  //   refetchOnMount: true, //do not refetch on mount
  //   refetchInterval: true, //do not refetch at intervals
  //   refetchIntervalInBackground: true, //do not refetch in background
  //   queryFn: async () => {
  //     const { data } = await axiosFetch.get("/admins/getAllBioDataPerUser/" + viewUser._id);
  //     console.log(data);
  //     console.log(data.AllBioDataPerUser[0]);
  //     setUpdateData(data.AllBioDataPerUser[0]);
  //     return data;
  //   },
  // });

  // console.log(data);
  // console.log(error);
  // console.log(isLoading);
  // if (error) {
  //   toast.error(
  //     <div>
  //       <span>
  //         {error.response ? error.response.data.msg : "Something went wrong contact Admin"}
  //       </span>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: 8000,
  //       hideProgressBar: true,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       className: "toastBad",
  //     }
  //   );
  // }
  // console.log(userData);

  // PREPARING THE USER BIO FILE FOR DOWNLOAD
  //SENDING THE DATA TO PDF
  // if (updateData) {
  //   var bioURL = updateData.UserFileUrl;
  // }

  if (!viewUser) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      <div className="bioModal">
        <FaX className="cancelEdit" onClick={closeViewModal} />
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div>
                <div className="bioDataProfileMainBody">
                  <div className="bioDataProfileBody">
                    <div className="singleProfile">
                      <p className="profileLabel">First Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.nextOfKinFirstName : "First Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Last Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.nextOfKinLastName : "Last Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Relationship</p>
                      <h4 className="profileName">
                        {updateData ? updateData.nextOfKinRelationship : "Relationship"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Gender</p>
                      <h4 className="profileName">{updateData ? updateData.gender : "Gender"}</h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">House Address</p>
                      <h4 className="profileName">
                        {updateData ? updateData.houseAddress : "House Address"}
                        {/* {data && data.userBio && data.userBio.houseAddress.length > 20
                    ? data.userBio.houseAddress.substring(0, 30) + "..."
                    : data.userBio.houseAddress} */}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Phone Number</p>
                      <h4 className="profileName">
                        {updateData ? updateData.phoneNumber : "Phone Number"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                  </div>
                </div>
                <div className="btns profileBtn">
                  <button className="btn" onClick={closeViewModal}>
                    Cancel
                  </button>
                  <button
                    className="btn"
                    onClick={() => window.open("http://localhost:5173/pdfPagebioDATA", "_blank")}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNOKModal;

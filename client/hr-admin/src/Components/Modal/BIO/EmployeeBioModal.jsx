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

const EmployeeBioModal = ({ viewUser }) => {
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
  const downloadAttach = () => {
    console.log("click");
    const downLoadAttachUrl = updateData.UserFileUrl.replace("/upload/", "/upload/fl_attachment/");
    window.open(downLoadAttachUrl, "_blank");
  };

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
                        {updateData ? updateData.firstName : "First Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Middle Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.middleName : "Middle Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Last Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.lastName : "Last Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>

                    <div className="singleProfile">
                      <p className="profileLabel">Email Address</p>
                      <h4 className="profileName">
                        {updateData ? updateData.email : "Email"}
                        {/* {data && data.userBio && data.userBio.email.length > 22
                    ? data.userBio.email.substring(0, 25) + "..."
                    : data.userBio.email} */}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Date of Birth</p>
                      <h4 className="profileName">
                        {updateData ? updateData.dateOfBirth.split("T")[0] : "Date of Birth"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">State of Origin</p>
                      <h4 className="profileName">
                        {updateData ? updateData.state_of_origin : "Origin"} State
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Gender</p>
                      <h4 className="profileName">{updateData ? updateData.gender : "Gender"}</h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Marital Status</p>
                      <h4 className="profileName">
                        {updateData ? updateData.maritalStatus : "Marital Status"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Spouse Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.spouseName : "Spouse Name"}
                      </h4>
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
                    <div className="singleProfile">
                      <p className="profileLabel">Bank Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.bankName : "Bank Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Bank Account Number</p>
                      <h4 className="profileName">
                        {updateData ? updateData.bankAccountNumber : "Bank Account Number"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Pension</p>
                      <h4 className="profileName">{updateData ? updateData.pension : "Pension"}</h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Pension Company</p>
                      <h4 className="profileName">
                        {updateData ? updateData.pensionCompany : "Pension Company"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Pension Account Number</p>
                      <h4 className="profileName">
                        {updateData ? updateData.pensionPin : "Pension Pin"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Level of Education</p>
                      <h4 className="profileName">
                        {updateData ? updateData.levelOfEducation : "Level of Education"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className=" downloadCV" onClick={() => downloadAttach()}>
                      <FaDownload className="downCV" />
                      <p className="CVprofileLabel">Download CV</p>
                    </div>
                  </div>
                </div>
                <div className="btns profileBtn">
                  <button className="btn" onClick={closeViewModal}>
                    Cancel
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      window.open(
                        `http://localhost:5173/adminBIOPDF?id=${updateData._id}`,
                        "_blank"
                      )
                    }>
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

export default EmployeeBioModal;

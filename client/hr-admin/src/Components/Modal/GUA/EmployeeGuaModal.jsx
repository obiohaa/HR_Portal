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

const EmployeeGuaModal = ({ viewUser }) => {
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
  if (updateData) {
    var idCard = updateData.identificationCard;
    var passportImage = updateData.passport;
  }

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
                      <p className="profileLabel">Full Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.fullName : "Full Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Employer</p>
                      <h4 className="profileName">
                        {updateData ? updateData.employer : "Employer"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Occupation</p>
                      <h4 className="profileName">
                        {updateData ? updateData.occupation : "Occupation"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>

                    <div className="singleProfile">
                      <p className="profileLabel">Email Address</p>
                      <h4 className="profileName">
                        {updateData && updateData.guarantorOneEmail
                          ? updateData.guarantorOneEmail
                          : updateData && updateData.guarantorTwoEmail
                          ? updateData.guarantorTwoEmail
                          : "Email Address"}
                        {/* {data && data.userBio && data.userBio.email.length > 22
                    ? data.userBio.email.substring(0, 25) + "..."
                    : data.userBio.email} */}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">House Address</p>
                      <h4 className="profileName">
                        {updateData ? updateData.houseAddress : "House Address"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Employer Address</p>
                      <h4 className="profileName">
                        {updateData ? updateData.employerAddress : "Employer Address"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">25-55 years</p>
                      <h4 className="profileName">
                        {updateData ? updateData.ageRange : "Age Range"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Uniform Public Servant</p>
                      <h4 className="profileName">
                        {updateData ? updateData.uniformedPublicServant : "Uniform Public Servant"}
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
                      <p className="profileLabel">Employee Full Name</p>
                      <h4 className="profileName">
                        {updateData ? updateData.employeeFullName : "Employee Full Name"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Employee Designation</p>
                      <h4 className="profileName">
                        {updateData ? updateData.employeeDesignation : "Employee Designation"}
                        {/* {data && data.userBio && data.userBio.houseAddress.length > 20
                    ? data.userBio.houseAddress.substring(0, 30) + "..."
                    : data.userBio.houseAddress} */}
                      </h4>
                      <div className="profileLine"></div>
                    </div>

                    <div className="singleProfile">
                      <p className="profileLabel">Outlet Employed</p>
                      <h4 className="profileName">
                        {updateData ? updateData.outletEmployed : "Outlet Employed"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className="singleProfile">
                      <p className="profileLabel">Policy Signed</p>
                      <h4 className="profileName">
                        {updateData ? updateData.signedPolicy : "Policy Signed"}
                      </h4>
                      <div className="profileLine"></div>
                    </div>
                    <div className=" downloadCV" onClick={() => window.open(idCard, "_blank")}>
                      <FaDownload className="downCV" />
                      <p className="CVprofileLabel">ID Card</p>
                    </div>
                    <div
                      className=" downloadCV"
                      onClick={() => window.open(passportImage, "_blank")}>
                      <FaDownload className="downCV" />
                      <p className="CVprofileLabel">Passport ID</p>
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
export default EmployeeGuaModal;

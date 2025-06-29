import React from "react";
import { FaDownload } from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/Modal/ProfileModal";
import EditBioDataModal from "../../../../Components/Modal/EditBioDataModal";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import PageLoading from "../../../../Components/Checks/PageLoading";

const BioData = () => {
  const { userStepState, openModal, isModalOpen } = useGlobalContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bioDataKey", "currentUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/getSingleBioData");
      console.log(data);
      console.log(data.userBio);
      return data;
    },
  });

  console.log(error);
  console.log(data);
  // console.log(userData);

  // PREPARING THE USER BIO FILE FOR DOWNLOAD
  //SENDING THE DATA TO PDF
  if (data && data.userBio) {
    var bioURL = data.userBio.UserFileUrl;
  }

  if (isLoading) {
    <PageLoading />;
  }

  return (
    <div className="bioDataProfileContainer">
      {userStepState && userStepState.completedStep <= 0 ? (
        <ProfileModal />
      ) : (
        <div>
          {isModalOpen && <EditBioDataModal userBio={data.userBio} />}
          <div className="bioDataProfileMainBody">
            <div className="bioDataProfileBody">
              <div className="singleProfile">
                <p className="profileLabel">First Name</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.firstName : "First Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Middle Name</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.middleName : "Middle Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Last Name</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.lastName : "Last Name"}
                </h4>
                <div className="profileLine"></div>
              </div>

              <div className="singleProfile">
                <p className="profileLabel">Email Address</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.email : "Email"}
                  {/* {data && data.userBio && data.userBio.email.length > 22
                    ? data.userBio.email.substring(0, 25) + "..."
                    : data.userBio.email} */}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Date of Birth</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.dateOfBirth.split("T")[0] : "Date of Birth"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">State of Origin</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.state_of_origin : "Origin"} State
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Gender</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.gender : "Gender"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Marital Status</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.maritalStatus : "Marital Status"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Spouse Name</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.spouseName : "Spouse Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">House Address</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.houseAddress : "House Address"}
                  {/* {data && data.userBio && data.userBio.houseAddress.length > 20
                    ? data.userBio.houseAddress.substring(0, 30) + "..."
                    : data.userBio.houseAddress} */}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Phone Number</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.phoneNumber : "Phone Number"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Bank Name</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.bankName : "Bank Name"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Bank Account Number</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.bankAccountNumber : "Bank Account Number"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.pension : "Pension"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension Company</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.pensionCompany : "Pension Company"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension Account Number</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.pensionPin : "Pension Pin"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Level of Education</p>
                <h4 className="profileName">
                  {data && data.userBio ? data.userBio.levelOfEducation : "Level of Education"}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className=" downloadCV" onClick={() => window.open(bioURL, "_blank")}>
                <FaDownload className="downCV" />
                <p className="CVprofileLabel">Download CV</p>
              </div>
            </div>
          </div>
          <div className="btns profileBtn">
            <button
              className="btn"
              onClick={() => window.open("http://localhost:5173/pdfPagebioDATA", "_blank")}>
              Download
            </button>
            <button className="btn" onClick={openModal}>
              Edit
            </button>
          </div>
        </div>
        //
      )}
    </div>
  );
};
export default BioData;

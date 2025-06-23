import React from "react";
import { FaDownload } from "react-icons/fa6";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/ProfileModal";

const BioData = () => {
  const { user, userStepState } = useGlobalContext();
  console.log(userStepState);
  console.log(user);
  const testForAddress = "Solomon charles is close by to my house and u need to see him";

  return (
    <div className="bioDataProfileContainer">
      {userStepState && userStepState.completedStep <= 0 ? (
        <ProfileModal />
      ) : (
        <div>
          <div className="bioDataProfileMainBody">
            <div className="bioDataProfileBody">
              <div className="singleProfile">
                <p className="profileLabel">First Name</p>
                <h4 className="profileName">Chukwuebuka</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Middle Name</p>
                <h4 className="profileName">Emmanuel</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Last Name</p>
                <h4 className="profileName">Obi</h4>
                <div className="profileLine"></div>
              </div>

              <div className="singleProfile">
                <p className="profileLabel">Email Address</p>
                <h4 className="profileName">chukwuebuka.emmanuel@gmail.com</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Date of Birth</p>
                <h4 className="profileName">2025-05-26</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">State of Origin</p>
                <h4 className="profileName">Imo State</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Gender</p>
                <h4 className="profileName">Male</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Marital Status</p>
                <h4 className="profileName">Married</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Spouse Name</p>
                <h4 className="profileName">Nneoma</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">House Address</p>
                <h4 className="profileName">
                  {" "}
                  {testForAddress.length > 20
                    ? testForAddress.substring(0, 30) + "..."
                    : testForAddress}
                </h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Phone Number</p>
                <h4 className="profileName">08033655891</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Bank Name</p>
                <h4 className="profileName">Fidelity Bank</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Bank Account Number</p>
                <h4 className="profileName">6989665748</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension</p>
                <h4 className="profileName">No</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension Name</p>
                <h4 className="profileName">Fidelity Pension</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Pension Account Number</p>
                <h4 className="profileName">Fidelity Bank</h4>
                <div className="profileLine"></div>
              </div>
              <div className=" downloadCV">
                <FaDownload className="downCV" />
                <p className="CVprofileLabel">Download CV</p>
              </div>
            </div>
          </div>
          <div className="btns profileBtn">
            <button className="btn ">Download</button>
            <button className="btn ">Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BioData;

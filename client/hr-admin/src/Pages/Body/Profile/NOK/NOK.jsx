import React from "react";
import { FaDownload } from "react-icons/fa6";

import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/ProfileModal";

const NOK = () => {
  const { user, userStepState } = useGlobalContext();
  console.log(userStepState);
  console.log(user);
  const testForAddress = "Solomon charles is close by to my house and u need to see him";
  return (
    <div className="bioDataProfileContainer">
      {userStepState && userStepState.completedStep <= 1 ? (
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
                <p className="profileLabel">Last Name</p>
                <h4 className="profileName">Obi</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Relationship</p>
                <h4 className="profileName">Sister</h4>
                <div className="profileLine"></div>
              </div>
              <div className="singleProfile">
                <p className="profileLabel">Gender</p>
                <h4 className="profileName">Male</h4>
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
export default NOK;

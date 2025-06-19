import React from "react";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/ProfileModal";

const BioData = () => {
  const { user, userStepState } = useGlobalContext();
  console.log(userStepState);
  console.log(user);
  return (
    <div className="bioDataProfileContainer">
      {userStepState && userStepState.completedStep >= 0 ? (
        <ProfileModal />
      ) : (
        <div className="bioDataProfileBody">
          <h4>hi bio D</h4>
        </div>
      )}
    </div>
  );
};
export default BioData;

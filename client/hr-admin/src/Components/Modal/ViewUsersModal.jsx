import React from "react";
import { useGlobalContext } from "../../Context/userContext";
import PageLoading from "../../Components/Checks/PageLoading";
import capitalizeFirstLetter from "../../Components/ToUpperCase";

const ViewUsersModal = ({ viewUser }) => {
  const { closeViewModal } = useGlobalContext();
  //Inline styling for the background image
  const backgroundImage =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const myUserProfileSection = {
    width: "100%",
    height: "250px",
    backgroundImage: `url(${backgroundImage})`, // Use template literals for imported images
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    borderRadius: "8px 8px 0 0",
  };
  //
  return (
    <div className="viewModal-container">
      <div className="viewModal">
        <div style={myUserProfileSection}>
          <div className="viewProfileImage">
            <img
              src={
                viewUser
                  ? viewUser.imgURL
                  : "https://res.cloudinary.com/theplace-com-ng/image/upload/v1750007725/HR_ADMIN_PORTAL/tmp-1-1750007720064_kck4pv.jpg"
              }
              alt=""
              className="profileImg"
            />
          </div>
        </div>
        <div className="loggedInUserBody">
          <h2 className="loggedInUserName">
            {capitalizeFirstLetter(viewUser?.firstName)} {capitalizeFirstLetter(viewUser?.lastName)}
          </h2>
          <p className="loggedInUserEmail">{viewUser?.email}</p>
          <div className="verification">
            <input
              type="checkbox"
              className="verificationCheck"
              id=""
              name=""
              checked={viewUser.isVerified === true ? true : ""}
              disabled
            />
            <label htmlFor="emailVerified" className="verificationLabel">
              {viewUser.isVerified === true ? "Email Verified" : "Email Not Verified"}
            </label>
          </div>
          <button type="submit" className="btn btnProfile" onClick={closeViewModal}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewUsersModal;

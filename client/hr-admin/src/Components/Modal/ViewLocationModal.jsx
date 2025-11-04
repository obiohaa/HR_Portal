import React from "react";
import { useGlobalContext } from "../../Context/userContext";
import PageLoading from "../../Components/Checks/PageLoading";
import capitalizeFirstLetter from "../../Components/ToUpperCase";
import TimeRangeDisplay from "../../Pages/Body/Admin/OutletLocations/DisplayOpenTime";

const ViewLocationModal = ({ viewUser }) => {
  // console.log(viewUser);
  const { closeViewModal } = useGlobalContext();
  //Inline styling for the background image
  const backgroundImage = viewUser?.imgURL;
  const myUserProfileSection = {
    width: "100%",
    height: "280px",
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
            The Place {capitalizeFirstLetter(viewUser?.OutletName)}
          </h2>
          <p className="loggedInUserEmail">{viewUser?.email}</p>
          <div className="verification">
            <input
              type="checkbox"
              className="verificationCheck"
              id=""
              name=""
              checked={viewUser.active === true ? true : ""}
              disabled
            />
            <label htmlFor="emailVerified" className="verificationLabel">
              {viewUser.active === true ? "Outlet Enabled" : "Outlet Disabled"}
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontWeight: "600" }}>
            Opening Time :&nbsp; {TimeRangeDisplay(viewUser?.timeRange)}
          </div>
          <button type="submit" className="btn btnProfile" onClick={closeViewModal}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewLocationModal;

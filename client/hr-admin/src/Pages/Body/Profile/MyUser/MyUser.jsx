import React from "react";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/ProfileModal";
import EditUserModal from "../../../../Components/EditUserModal";
import PageLoading from "../../../../Components/PageLoading";
import capitalizeFirstLetter from "../../../../Components/ToUpperCase";

const MyUser = () => {
  const { openModal, user, isModalOpen } = useGlobalContext();

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
  };

  return (
    <div className="bioDataProfileContainer">
      {isModalOpen && <EditUserModal user={user} />}
      {!user ? (
        <PageLoading />
      ) : (
        <div className="MyUserProfileBody">
          <div style={myUserProfileSection}>
            <div className="myUserProfileImage">
              <img
                src={
                  user
                    ? user.imgURL
                    : "https://res.cloudinary.com/theplace-com-ng/image/upload/v1750007725/HR_ADMIN_PORTAL/tmp-1-1750007720064_kck4pv.jpg"
                }
                alt=""
                className="profileImg"
              />
            </div>
          </div>
          <div className="loggedInUserBody">
            <h2 className="loggedInUserName">
              {capitalizeFirstLetter(user?.firstName)} {capitalizeFirstLetter(user?.lastName)}
            </h2>
            <p className="loggedInUserEmail">{user?.email}</p>
            <button type="submit" className="btn btnProfile" onClick={openModal}>
              EDIT
            </button>
          </div>
          {/* FORM HERE */}
        </div>
      )}
    </div>
  );
};
export default MyUser;

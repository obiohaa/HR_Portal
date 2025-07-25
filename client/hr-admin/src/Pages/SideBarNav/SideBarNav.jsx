// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled, { keyframes } from "styled-components";
// import { AdminSideBar } from "./SideBarData"; // Adjust the import path as necessary
// import {
//   FaClipboardList,
//   FaChessKing,
//   FaUser,
//   FaAngleRight,
//   FaFileZipper,
//   FaClipboardUser,
//   FaHandshake,
//   FaPowerOff,
//   FaCircleUser,
// } from "react-icons/fa6";

// const slideDown = keyframes`
//   from {
//     max-height: 0;
//     opacity: 0;
//     transform: translateY(-10px);
//   }
//   to {
//     max-height: 500px;
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const slideUp = keyframes`
//   from {
//     max-height: 500px;
//     opacity: 1;
//     transform: translateY(0);
//   }
//   to {
//     max-height: 0;
//     opacity: 0;
//     transform: translateY(-10px);
//   }
// `;

// const SidebarContainer = styled.div`
//   width: ${({ collapsed }) => (collapsed ? "80px" : "250px")};
//   background: #1a1a2e;
//   color: white;
//   height: 100vh;
//   padding-top: 20px;
//   transition: width 0.3s ease;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const SidebarButton = styled.button`
//   margin: 10px;
//   background: transparent;
//   color: white;
//   border: none;
//   cursor: pointer;
// `;

// const MenuItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   cursor: pointer;
//   position: relative;
//   background-color: ${({ active }) => (active ? "#16213e" : "transparent")};
//   transition: background 0.3s ease;

//   &:hover {
//     background-color: #16213e;
//   }
// `;

// const SubMenuContainer = styled.div`
//   max-height: ${({ open }) => (open ? "500px" : "0")};
//   overflow: hidden;
//   animation: ${({ open }) => (open ? slideDown : slideUp)} 0.3s ease forwards;
//   padding-left: ${({ collapsed }) => (collapsed ? "0" : "30px")};
// `;

// const SubMenuLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   color: ${({ active }) => (active ? "#00adb5" : "white")};
//   padding: 6px 0;
//   text-decoration: none;
//   font-weight: ${({ active }) => (active ? "bold" : "normal")};
//   transition: color 0.3s ease;

//   &:hover {
//     color: #00adb5;
//   }

//   svg {
//     margin-right: 10px;
//   }
// `;

// const Footer = styled.div`
//   padding: 20px;
//   border-top: 1px solid #444;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-size: 14px;
//   white-space: nowrap;
// `;

// const LogoutButton = styled.div`
//   margin-left: auto;
//   cursor: pointer;
//   position: relative;

//   &:hover::after {
//     content: "Logout";
//     position: absolute;
//     top: -30px;
//     right: 0;
//     background: #333;
//     padding: 4px 8px;
//     border-radius: 4px;
//     font-size: 12px;
//     white-space: nowrap;
//     color: white;
//   }
// `;

// const SideBarNav = ({ userFullName = "John Doe" }) => {
//   const location = useLocation();
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleDropdown = (id) => {
//     setActiveDropdown((prev) => (prev === id ? null : id));
//   };

//   const toggleSidebar = () => {
//     setCollapsed((prev) => !prev);
//   };

//   const isActive = (url) => {
//     return location.pathname === url;
//   };

//   return (
//     <SidebarContainer collapsed={collapsed}>
//       <div>
//         <SidebarButton onClick={toggleSidebar}>{collapsed ? "➡️" : "⬅️"}</SidebarButton>

//         {AdminSideBar.map((item) => (
//           <div key={item.id}>
//             <MenuItem
//               onClick={() => (item.subNav ? toggleDropdown(item.id) : null)}
//               title={collapsed ? item.text : ""}
//               active={isActive(item.url)}>
//               <span
//                 style={{
//                   marginRight: collapsed ? 0 : "10px",
//                   fontSize: "18px",
//                 }}>
//                 {item.icon}
//               </span>
//               {!collapsed && <span>{item.text}</span>}
//               {item.subNav && !collapsed && (
//                 <span
//                   style={{
//                     marginLeft: "auto",
//                     transition: "transform 0.3s ease",
//                     transform: activeDropdown === item.id ? "rotate(90deg)" : "rotate(0deg)",
//                   }}>
//                   {item.iconClosed}
//                 </span>
//               )}
//             </MenuItem>

//             <SubMenuContainer
//               open={item.subNav && activeDropdown === item.id && !collapsed}
//               collapsed={collapsed}>
//               {item.subNav &&
//                 item.subNav.map((sub) => (
//                   <SubMenuLink to={sub.url} key={sub.id} active={isActive(sub.url)}>
//                     {sub.icon || <FaAngleRight />} {sub.text}
//                   </SubMenuLink>
//                 ))}
//             </SubMenuContainer>
//           </div>
//         ))}
//       </div>

//       <Footer>
//         <FaCircleUser />
//         {!collapsed && <span>{userFullName}</span>}
//         <LogoutButton>
//           <FaPowerOff />
//         </LogoutButton>
//       </Footer>
//     </SidebarContainer>
//   );
// };

// export default SideBarNav;

///////////////////////////////////////////////////////

// Usage
// <Sidebar items={AdminSideBar} userFullName="Jane Smith" /> or <Sidebar items={EmployeeSideBar} userFullName="John Doe" />
////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../../Components/ToUpperCase";
import { useGlobalContext } from "../../Context/userContext";
import Loading from "../../Components/Checks/Loading";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosFetch } from "../../Utils/axiosFetch";
import SideBarContent from "./SideBarContent";
import { AdminSideBar, EmployeeSideBar } from "./SideBarData";
import "./SideBarNav.css";

const SideBarNav = () => {
  const navigate = useNavigate();
  const { isBarOpen, setIsBarOpen, user } = useGlobalContext();
  //LOGOUT
  //Using react query to handle the API call
  const { mutate: logOutUser } = useMutation({
    mutationFn: async () => axiosFetch.delete("/auth/logout"),
    onSuccess: (data) => {
      navigate("/login");
      toast.success(data.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
    },
    onError: () => {
      navigate("/login");
    },
  });

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div
      className={isBarOpen ? "side-nav-container" : "side-nav-container side-nav-container-close"}>
      <div className="nav-upper">
        <div className="nav-heading">
          {isBarOpen && (
            <div className="nav-brand">
              <img src="/logo.svg" alt="" />
              <h4>HR Portal</h4>
            </div>
          )}
          <button
            className={isBarOpen ? "hamburger hamburger-in" : "hamburger hamburger-out"}
            onClick={() => setIsBarOpen(!isBarOpen)}>
            <div className="barGroup">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <div className="line"></div>
        {user && user.role === "admin" ? (
          <SideBarContent loginRole={AdminSideBar} />
        ) : user && user.role === "employee" ? (
          <SideBarContent loginRole={EmployeeSideBar} />
        ) : (
          ""
        )}
      </div>
      <div className="nav-footer">
        <div className="nav-details">
          {isBarOpen && (
            <div className="nav-footer-info">
              <p className="nav-footer-user-name">
                {user ? (
                  capitalizeFirstLetter(user.firstName) + " " + capitalizeFirstLetter(user.lastName)
                ) : (
                  <Loading />
                )}
              </p>
              <p className="nav-footer-user-position">
                HR {user && capitalizeFirstLetter(user.role)}
              </p>
            </div>
          )}
          <div className="footer-icons power-icon" onClick={logOutUser}>
            {<FaPowerOff />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;

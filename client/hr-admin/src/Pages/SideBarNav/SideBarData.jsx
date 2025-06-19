import React from "react";
import {
  FaFileZipper,
  FaKey,
  FaUser,
  FaClipboardList,
  FaAngleRight,
  FaChessKing,
  FaFilePowerpoint,
  FaHandshake,
  FaClipboardUser,
} from "react-icons/fa6";

const AdminSideBar = [
  {
    id: 1,
    url: "/dashboard",
    text: "Dashboard",
    icon: <FaClipboardList />,
  },
  {
    id: 2,
    url: "/create-admins",
    text: "Add Admins",
    icon: <FaChessKing />,
  },
  {
    id: 3,
    url: "#",
    text: "Users",
    icon: <FaUser />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/admin-user",
        text: "Admins",
      },
      {
        id: 2,
        url: "/user",
        text: "Employees",
      },
    ],
  },
  {
    id: 4,
    url: "#",
    text: "Profiles",
    icon: <FaFilePowerpoint />,
  },
  {
    id: 5,
    url: "/openings",
    text: "Job Opening",
    icon: <FaHandshake />,
  },
];
///////////////////////////////////////////////////
const EmployeeSideBar = [
  {
    id: 1,
    url: "/dashboard",
    text: "Dashboard",
    icon: <FaClipboardList />,
  },
  {
    id: 2,
    url: "/user",
    text: "E - Form",
    icon: <FaFileZipper />,
  },
  {
    id: 3,
    url: "#",
    text: "E - Profile",
    icon: <FaClipboardUser />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/my_user",
        text: "My User",
      },
      {
        id: 1,
        url: "/biodata",
        text: "Bio Data",
      },
      {
        id: 3,
        url: "/nextofkin",
        text: "Next of Kin",
      },
      {
        id: 3,
        url: "/nda",
        text: "NDA",
      },
    ],
  },
  {
    id: 4,
    url: "/jobopenings",
    text: "Job Opening",
    icon: <FaHandshake />,
  },
];

export { AdminSideBar, EmployeeSideBar };

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
  FaGlobe,
  FaUsers,
} from "react-icons/fa6";

const AdminSideBar = [
  {
    id: 1,
    url: "/Admin_dashboard",
    text: "Dashboard",
    icon: <FaClipboardList />,
  },
  {
    id: 2,
    url: "#",
    text: "Admins",
    icon: <FaChessKing />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/admin-user",
        text: "Admin Profile",
      },
      {
        id: 2,
        url: "/add-admin",
        text: "Add Admin",
      },
    ],
  },
  {
    id: 3,
    url: "#",
    text: "Employees",
    icon: <FaUser />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/Registered-employee",
        text: "Registered",
      },
      {
        id: 2,
        url: "/Resumed-employee",
        text: "Resumed",
      },
      {
        id: 3,
        url: "/exited-employee",
        text: "exited",
      },
    ],
  },
  {
    id: 4,
    url: "#",
    text: "Other Data",
    icon: <FaUsers />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/admin-bioData",
        text: "Bio Data",
      },
      {
        id: 2,
        url: "/admin-NOK",
        text: "Next of Kin",
      },
      {
        id: 3,
        url: "/admin-guarantor",
        text: "Guarantor",
      },
      {
        id: 7,
        url: "/admin-bioDataG_One",
        text: "NDA",
      },
    ],
  },
  {
    id: 5,
    url: "#",
    text: "Website Content",
    icon: <FaGlobe />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/admin_jobs",
        text: "Job Opening",
      },
      {
        id: 2,
        url: "/Outlet-locations",
        text: "Outlet Locations",
      },
    ],
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
    url: "/job_opening",
    text: "Job Opening",
    icon: <FaHandshake />,
  },
];

export { AdminSideBar, EmployeeSideBar };

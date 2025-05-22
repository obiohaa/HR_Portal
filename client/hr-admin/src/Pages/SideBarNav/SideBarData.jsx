import React from "react";
import {
  FaHouse,
  FaKey,
  FaUser,
  FaClipboardList,
  FaAngleRight,
  FaFilePowerpoint,
  FaHandshake,
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
    url: "#",
    text: "Users",
    icon: <FaUser />,
    iconClosed: <FaAngleRight />,
    subNav: [
      {
        id: 1,
        url: "/admin-user",
        text: "Admins",
        icon: <FaHouse />,
      },
      {
        id: 3,
        url: "/employee-user",
        text: "Employees",
        icon: <FaHouse />,
      },
    ],
  },
  {
    id: 3,
    url: "/profiles",
    text: "Profiles",
    icon: <FaFilePowerpoint />,
  },
  {
    id: 4,
    url: "/openings",
    text: "Job Opening",
    icon: <FaHandshake />,
  },
];

const EmployeeSideBar = [
  {
    id: 1,
    url: "/employee-form",
    text: "Employee Form",
    icon: <FaHouse />,
  },
  {
    id: 2,
    url: "/employee-profile",
    text: "Employee Profile",
    icon: <FaKey />,
  },
];

export { AdminSideBar, EmployeeSideBar };

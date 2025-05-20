import React from "react";
import { FaHouse, FaKey, FaUserGear, FaPowerOff, FaAngleRight } from "react-icons/fa6";

const AdminSideBar = [
  {
    id: 1,
    url: "/dashboard",
    text: "Dashboard",
    icon: <FaHouse />,
  },
  {
    id: 2,
    url: "#",
    text: "Users",
    icon: <FaHouse />,
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
    icon: <FaHouse />,
  },
  {
    id: 4,
    url: "/openings",
    text: "Job Opening",
    icon: <FaHouse />,
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

// /////////////////////////////////////////////////////////////

import React from "react";
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
          {!isBarOpen && <div className="tooltip">Log Out</div>}
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;

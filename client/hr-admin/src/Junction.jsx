import React from "react";
import { Outlet } from "react-router-dom";
import SideBarNav from "./Pages/SideBarNav/SideBarNav";
import "./Pages/Body/body.css";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "./Utils/axiosFetch";
import { toast } from "react-toastify";
import { useSessionExpiry } from "./Hooks/useSessionExpiry";
import { useGlobalContext } from "./Context/userContext";

const Junction = () => {
  const { saveUser, removeUser, user } = useGlobalContext();
  // console.log(user);
  useQuery({
    queryKey: ["currentUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/showMe");
      saveUser(data.user);
      return data;
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error(
          <div>
            <span>
              {error.response ? error.response.data.msg : "Session expired, Please log in again"}
            </span>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toastBad",
          }
        );
        removeUser();
        window.location.href = "/login";
      }
    },
  });

  // Automatically log out when session time expires
  useSessionExpiry(user);

  return (
    <div className="generalContainer">
      <div className="sideBars">
        <SideBarNav />
      </div>
      <div className="userContainer">
        <Outlet /> {/* This renders the matched route inside the layout */}
      </div>
    </div>
  );
};

export default Junction;

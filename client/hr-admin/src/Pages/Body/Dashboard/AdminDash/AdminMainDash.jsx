import React, { useState, useEffect } from "react";
import "../Dashboard.css";
import PageLoading from "../../../../Components/Checks/PageLoading";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../../../../Utils/axiosFetch";
import { useGlobalContext } from "../../../../Context/userContext";
import useCountUp from "../../../../Hooks/useCountUp";
import formatNumber from "../../../../Components/FormatNumber";
import {
  FaChessKing,
  FaUsers,
  FaFileCircleXmark,
  FaUserSecret,
  FaUser,
  FaUserGear,
  FaLocationDot,
  FaBriefcase,
} from "react-icons/fa6";

const AdminMainDash = () => {
  const { user, saveUser } = useGlobalContext();
  const [dashData, setDashData] = useState();
  // console.log(user);

  // Fetch the current user data
  useQuery({
    queryKey: ["currentUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/showMe");
      saveUser(data.user);
      // console.log(data.user);
      return data;
    },
    onError: () => {},
  });

  const { data, isLoading: stepLoading } = useQuery({
    queryKey: ["dashboard"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/admins/dashboard");
      // console.log(data.msg);
      // console.log(data.dashData);
      setDashData(data.dashData);
      return data;
    },
    onError: () => {},
  });

  const totalBioData = useCountUp(dashData?.totalBioData || 0, 1000);
  const totalNOK = useCountUp(dashData?.totalNOK || 0, 1000);
  const totalGuarantors = useCountUp(dashData?.totalGuarantors || 0, 1000);
  const totalNDA = useCountUp(dashData?.totalNDA || 0, 1000);
  const totalEmployees = useCountUp(dashData?.totalEmployees || 0, 1000);
  const totalAdmins = useCountUp(dashData?.totalAdmins || 0, 1000);
  const totalLocations = useCountUp(dashData?.outletLocation || 0, 1000);
  const totalOpenJobs = useCountUp(dashData?.openJobs || 0, 1000);

  //USE STALE DATA IF AVAILABLE
  // This will set the pagination data to the fetched data when it is available
  useEffect(() => {
    data && setDashData(data.dashData);
  }, [data]);

  if (stepLoading) {
    return <PageLoading />;
  }

  return (
    <div className="employeeDashContainer">
      <div className="employeeDashBody">
        <div
          className={
            dashData && dashData.totalBioData >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.totalBioData >= 1 ? dashData.totalBioData : "0"} Bio Data(s)
          </span>
          <FaUser
            className={
              dashData && dashData.totalBioData >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div
            className={
              dashData && dashData.totalBioData >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={dashData && dashData.totalBioData >= 1 ? "dashCountColoured" : "dashCount"}>
            {formatNumber(totalBioData)}
          </div>
        </div>

        <div
          className={
            dashData && dashData.totalNOK >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.totalNOK >= 1 ? dashData.totalNOK : "0"} Next of Kin(s)
          </span>
          <FaUsers
            className={
              dashData && dashData.totalNOK >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div className={dashData && dashData.totalNOK >= 1 ? "dividerColoured" : "divider"}></div>
          <div className={dashData && dashData.totalNOK >= 1 ? "dashCountColoured" : "dashCount"}>
            {formatNumber(totalNOK)}
          </div>
        </div>
        <div
          className={
            dashData && dashData.totalGuarantors >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.totalGuarantors >= 1 ? dashData.totalGuarantors : "0"}{" "}
            Guarantor(s)
          </span>
          <FaUserSecret
            className={
              dashData && dashData.totalGuarantors >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div
            className={
              dashData && dashData.totalGuarantors >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              dashData && dashData.totalGuarantors >= 1 ? "dashCountColoured" : "dashCount"
            }>
            {formatNumber(totalGuarantors)}
          </div>
        </div>
        <div
          className={
            dashData && dashData.totalNDA >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.totalNDA >= 1 ? dashData.totalNDA : "0"} Signed NDA
          </span>
          <FaFileCircleXmark
            className={
              dashData && dashData.totalNDA >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div className={dashData && dashData.totalNDA >= 1 ? "dividerColoured" : "divider"}></div>
          <div className={dashData && dashData.totalNDA >= 1 ? "dashCountColoured" : "dashCount"}>
            {formatNumber(totalNDA)}
          </div>
        </div>
        <div
          className={
            dashData && dashData.totalEmployees >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.totalEmployees >= 1 ? dashData.totalEmployees : "0"} Employee(s)
          </span>

          <FaUserGear
            className={
              dashData && dashData.totalEmployees >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div
            className={
              dashData && dashData.totalEmployees >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              dashData && dashData.totalEmployees >= 1 ? "dashCountColoured" : "dashCount"
            }>
            {formatNumber(totalEmployees)}
          </div>
        </div>
        {user && user.role === "admin" && (
          <div
            className={
              dashData && dashData.totalAdmins >= 1
                ? "employeeDashSingle dashColoured"
                : "employeeDashSingle dashNotColoured"
            }>
            <span className="toolTipText">
              {dashData && dashData.totalAdmins >= 1 ? dashData.totalAdmins : "0"} Admin(s)
            </span>
            <FaChessKing
              className={
                dashData && dashData.totalAdmins >= 1 ? "dashIconColoured" : "dashIconNotColoured"
              }
            />
            <div
              className={
                dashData && dashData.totalAdmins >= 1 ? "dividerColoured" : "divider"
              }></div>
            <div
              className={dashData && dashData.totalAdmins >= 1 ? "dashCountColoured" : "dashCount"}>
              {formatNumber(totalAdmins)}
            </div>
          </div>
        )}

        <div
          className={
            dashData && dashData.outletLocation >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.outletLocation >= 1 ? dashData.outletLocation : "0"} Location(s)
          </span>

          <FaLocationDot
            className={
              dashData && dashData.outletLocation >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div
            className={
              dashData && dashData.outletLocation >= 1 ? "dividerColoured" : "divider"
            }></div>
          <div
            className={
              dashData && dashData.outletLocation >= 1 ? "dashCountColoured" : "dashCount"
            }>
            {formatNumber(totalLocations)}
          </div>
        </div>

        {/*  */}

        <div
          className={
            dashData && dashData.openJobs >= 1
              ? "employeeDashSingle dashColoured"
              : "employeeDashSingle dashNotColoured"
          }>
          <span className="toolTipText">
            {dashData && dashData.openJobs >= 1 ? dashData.openJobs : "0"} Open Job(s)
          </span>

          <FaBriefcase
            className={
              dashData && dashData.openJobs >= 1 ? "dashIconColoured" : "dashIconNotColoured"
            }
          />
          <div className={dashData && dashData.openJobs >= 1 ? "dividerColoured" : "divider"}></div>
          <div className={dashData && dashData.openJobs >= 1 ? "dashCountColoured" : "dashCount"}>
            {formatNumber(totalOpenJobs)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainDash;

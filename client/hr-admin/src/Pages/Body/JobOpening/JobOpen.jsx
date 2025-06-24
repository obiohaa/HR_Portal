import React from "react";
import { FaDownload } from "react-icons/fa6";
import { useGlobalContext } from "../../../Context/userContext";
import NoJob from "../../../Components/NoJob";

const JobOpen = () => {
  const { user } = useGlobalContext();

  return <div className="bioDataProfileContainer">{user ? <NoJob /> : <div></div>}</div>;
};
export default JobOpen;

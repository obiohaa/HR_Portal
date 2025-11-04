import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";
import { useGlobalContext } from "../Context/userContext";

export const useSessionExpiry = (userData) => {
  const navigate = useNavigate();
  const { removeUser } = useGlobalContext();
  const { logOutUser } = useLogout();

  useEffect(() => {
    if (!userData?.expiry) return;

    // Parse expiry time (stored in UTC)
    const expiryTimeUTC = new Date(userData.expiry);

    // Convert UTC → user's local time (auto handled by Date object)
    // const expiryLocal = new Date(expiryTimeUTC.getTime() + 60 * 60 * 1000); // add +1 hour for GMT+1 if needed manually
    const expiryLocal = new Date(expiryTimeUTC.getTime());

    // Calculate remaining time (ms)
    const remaining = expiryLocal.getTime() - Date.now();

    console.log("Session expires at (local):", expiryLocal.toString());
    console.log("Remaining time (ms):", remaining);

    if (remaining <= 0) {
      removeUser();
      logOutUser();
      navigate("/login");
      return;
    }

    // Set timer to auto logout when time is up
    const timer = setTimeout(() => {
      logOutUser();
      navigate("/login");
    }, remaining);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [userData, logOutUser, navigate, removeUser]);
};

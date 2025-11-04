import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosFetch } from "../Utils/axiosFetch";

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate: logOutUser, isPending } = useMutation({
    mutationFn: async () => {
      // call backend logout API to invalidate session/tokens
      return await axiosFetch.delete("/auth/logout");
    },
    onSuccess: (data) => {
      // redirect user to login page
      navigate("/login");

      // show success toast
      toast.success(data?.data?.msg || "Logged out successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toastGood",
      });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      navigate("/login");
    },
  });

  // return both the function and state for optional usage
  return { logOutUser, isPending };
};

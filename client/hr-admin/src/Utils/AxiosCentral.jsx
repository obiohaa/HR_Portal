import { axiosFetch } from "./axiosFetch";
import { toast } from "react-toastify";

// axiosFetch.js
axiosFetch.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      toast.error(
        <div>
          <span>
            {err.response ? err.response.data.msg : "Session expired, Please log in again"}
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
      window.location.href = "/login"; // auto-logout on session expiration
    }
    return Promise.reject(err);
  }
);

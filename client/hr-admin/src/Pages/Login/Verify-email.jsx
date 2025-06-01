import React, { useEffect, useState } from "react";
import Login from "./Login";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useLocation, Link } from "react-router-dom";
import PageLoading from "../../Components/PageLoading";
import ErrorPage from "../../Pages/Error/ErrorPage";

//Query string to get the token and email
function useQuery() {
  //The URLSearchParams interface defines utility methods to work with the query string of a URL like get().
  return new URLSearchParams(useLocation().search);
}

const Verify_email = () => {
  const [loading, setLoading] = useState(true);
  //   const [Error, setError] = useState(false);
  const query = useQuery();

  //Using react query to handle the API call
  const {
    mutate: verifyEmail,
    error,
    isError,
  } = useMutation({
    mutationFn: async () =>
      axiosFetch.post("/auth/verify_email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      }),
    onSuccess: (data) => {
      setLoading(false);
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
    onError: (error) => {
      setLoading(false);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      });
    },
  });

  useEffect(() => {
    //Check if the token and email are present in the query string
    if (query.get("token") && query.get("email")) {
      verifyEmail();
    } else {
      toast.error("Invalid verification link", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      });
    }
  }, []);
  // add [] to the useEffect to run it only once

  if (loading) {
    return (
      <div className="page_loading">
        <PageLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="errors">
        <ErrorPage status={error.status} msg={error.message} altMessage={error.response.data.msg} />
      </div>
    );
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default Verify_email;

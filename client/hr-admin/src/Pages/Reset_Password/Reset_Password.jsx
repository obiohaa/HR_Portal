import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useMutation } from "@tanstack/react-query";
import axiosFetch from "../../Utils/axiosFetch";
import { toast } from "react-toastify";
import "../Login/Login.css";
import logo from "/logo.svg";

function Reset_Password() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  //Using react query to handle the API call
  const { mutate: forgotPass, isLoading } = useMutation({
    mutationFn: async (forgotPass) => axiosFetch.post("/auth/forgot-password", { ...forgotPass }),
    onSuccess: (data) => {
      toast.success(data.data.msg, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
    },
    onError: (error) => {
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      });
    },
  });

  const onSubmit = async (values) => {
    try {
      forgotPass(values);
      console.log(values);
      reset();
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  //   const [user, setUser] = useState({
  //     email: "",
  //     password: "",
  //   });

  return (
    <section className="section">
      <div className="signupFrm">
        <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <div className="logo">
            <img src={logo} alt="" className="fetLogo" />
          </div>
          <div className="inputContainer">
            <div className="userDetails">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email..."
                formNoValidate
                {...register("email", {
                  required: "Email address is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address!",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <p className="reset">
              To reset your password, paste your registered email, and click reset password.
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="submitBtn"
            value="Login"
            formNoValidate>
            {isLoading ? <Loading /> : "Reset Password"}
          </button>
          {/* want to place an error so that it does not belong to any field we use root and not
          email or password or any field name */}
          {/* {errors.root && <p className="error">{errors.root.message}</p>} */}
          <p className="signup">
            Already have an account?{" "}
            <Link to="/login" className="signUpButton">
              sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Reset_Password;

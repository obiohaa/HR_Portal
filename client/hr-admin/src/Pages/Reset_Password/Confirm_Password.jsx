import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Link } from "react-router-dom";
import Loading from "../../Components/Checks/Loading";
import { useMutation } from "@tanstack/react-query";
import { axiosFetch } from "../../Utils/axiosFetch";
import { toast } from "react-toastify";
import "../Login/login.css";
import logo from "/logo.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Confirm_Password() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const query = useQuery();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  //Using react query to handle the API call
  const { mutate: resetPass, isLoading } = useMutation({
    mutationFn: async (resetPass) =>
      axiosFetch.post("/auth/reset-password", {
        ...resetPass,
        token: query.get("token"),
        email: query.get("email"),
      }),
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
      resetPass(values);
      reset();
      throw new Error();
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
          <div className="userDetails">
            <div className="eyeIcon">
              {showPassword ? (
                <FaRegEye onClick={togglePasswordVisibility} className="eye" />
              ) : (
                <FaRegEyeSlash onClick={togglePasswordVisibility} className="eye" />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Password..."
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="userDetails">
            <div className="eyeIcon">
              {showConfirmPassword ? (
                <FaRegEye onClick={toggleConfirmPasswordVisibility} className="eye" />
              ) : (
                <FaRegEyeSlash onClick={toggleConfirmPasswordVisibility} className="eye" />
              )}
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="input"
              placeholder="Confirm Password..."
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="submitBtn"
            value="Login"
            formNoValidate>
            {isLoading ? <Loading /> : "Update Password"}
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

export default Confirm_Password;

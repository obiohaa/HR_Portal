import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import PageLoading from "../../Components/PageLoading";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useGlobalContext } from "../../Context/userContext";
import "./Login.css";
import logo from "/logo.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();
  const { saveUser } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Using react query to handle the API call
  const { mutate: logUser, isLoading } = useMutation({
    mutationFn: async (logUser) => axiosFetch.post("/auth/login", { ...logUser }),
    onSuccess: (data) => {
      saveUser(data.data.user);
      toast.success(`Hello ${data.data.user.firstName}, welcome.`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
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

  const onSubmit = async (values) => {
    try {
      logUser(values);
      reset();
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

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
            <p className="forgot">
              <Link to="/forgot_password" className="forgot">
                Forgot Password
              </Link>
            </p>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="submitBtn"
            value="Login"
            formNoValidate>
            {isLoading ? <Loading /> : "Login"}
          </button>
          {/* want to place an error so that it does not belong to any field we use root and not
          email or password or any field name */}
          {/* {errors.root && <p className="error">{errors.root.message}</p>} */}
          <p className="signup">
            Don't have an account?{" "}
            <span>
              <Link to="/register" className="signUpButton">
                sign up
              </Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;

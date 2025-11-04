import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Checks/Loading";
import { axiosFetchFormData } from "../../Utils/axiosFetch";
import { toast } from "react-toastify";
import "../Login/login.css";
import logo from "/logo.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [imgError, setImgError] = useState({ msg: "" });
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: regUser, isLoading } = useMutation({
    mutationFn: async (regUser) => axiosFetchFormData.post("/auth/register", regUser),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["registerUser"] });
      reset();
      setImgName(null);
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
      if (imgName === null) {
        setImgError({ msg: "Passport Image is required" });
      } else if (imgName.size > 5000000) {
        setImgError({ msg: "Passport size must be less than 5MB" });
      } else {
        const formData = new FormData();
        formData.append("file", imgName);
        formData.append("body", JSON.stringify(values));
        // console.log(formData);
        regUser(formData);
        // reset();
      }
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
                type="text"
                name="firstName"
                className="input"
                placeholder="First Name..."
                {...register("firstName", {
                  required: "First Name is required!",
                  minLength: {
                    value: 2,
                    message: "Minimum characters of 2 letters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum characters of 20 letters.",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Alphabets only!",
                  },
                })}
              />
              {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            </div>
            <div className="userDetails">
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="Last Name..."
                {...register("lastName", {
                  required: "Last Name is required!",
                  minLength: {
                    value: 2,
                    message: "Minimum characters of 2 letters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum characters of 20 letters.",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Alphabets only!",
                  },
                })}
              />
              {errors.lastName && <p className="error">{errors.lastName.message}</p>}
            </div>
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
            <div className="registerUploadImg">
              <div
                className="clickUpload"
                onClick={() => document.querySelector(".upload_Doc").click()}>
                <label className="uploadDoc">Take Photo</label>
                <MdCloudUpload className="uploadIcon" />
              </div>
              <div className="fileName">
                {/* {fileName}{" "} */}
                {imgName === null ? (
                  ""
                ) : (
                  <div className="fileDetails">
                    {imgName.name}
                    {
                      <MdDelete
                        className="deleteUpload"
                        onClick={() => {
                          setImgName(null);
                        }}
                      />
                    }
                  </div>
                )}
              </div>
              <input
                id="file"
                type="file"
                name="file"
                className="upload_Doc"
                accept=".png, .jpeg, .jpg"
                //accept=".pdf, .docx, .docx, .odt"
                required
                hidden
                onChange={({ target: { files } }) => {
                  setImgError({ msg: "" });
                  files[0] && setImgName(files[0]);
                }}
              />
              {imgError.msg !== "" && <p className="bioError">{imgError.msg}</p>}
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="submitBtn"
            value="Login"
            formNoValidate>
            {isLoading ? <Loading /> : "Register"}
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

export default Register;

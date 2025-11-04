import React, { useState, useEffect } from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData } from "../../../Utils/axiosFetch";
import { FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const EditAdminEmployeeModal = ({ editUser }) => {
  const { closeEditModal } = useGlobalContext();
  //   const [showPassword, setShowPassword] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [emailVerify, setEmailVerify] = useState(editUser.isVerified);
  const [imgError, setImgError] = useState({ msg: "" });
  //   const togglePasswordVisibility = () => {
  //     setShowPassword((prevState) => !prevState);
  //   };
  // console.log(userStepState);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: editThisUser, isLoading } = useMutation({
    mutationFn: async (editThisUser) =>
      axiosFetchFormData.patch("/admins/adminEditUser", editThisUser),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adminEmployee"] });
      reset();
      setImgName(null);
      closeEditModal();
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
    values.isVerified = emailVerify;
    // console.log(values);
    try {
      if (imgName && imgName.size > 5000000) {
        setImgError({ msg: "Passport size must be less than 5MB" });
      } else {
        const formData = new FormData();
        formData.append("file", imgName);
        formData.append("body", JSON.stringify(values));
        // console.log(formData);
        editThisUser(formData);
      }
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  const updateCheck = () => {
    setEmailVerify(!emailVerify);
  };

  useEffect(() => {
    reset({
      firstName: editUser.firstName,
      lastName: editUser.lastName,
      email: editUser.email,
    });
  }, [reset, editUser]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      <div className="infoModal">
        <FaX className="cancelEdit" onClick={closeEditModal} />
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div className="signupFrmEdit">
                <form
                  className="formEdit"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                  noValidate>
                  <div className="formContainerEdit">
                    <div className="formBioData">
                      <input
                        type="text"
                        id="firstName"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
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
                      {errors.firstName && <p className="bioError">{errors.firstName.message}</p>}
                      <label htmlFor="firstName" className="form_label">
                        First Name
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="text"
                        id="lastName"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
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
                      {errors.lastName && <p className="bioError">{errors.lastName.message}</p>}
                      <label htmlFor="lastName" className="form_label">
                        Last Name
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="email"
                        id="email"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        disabled
                        {...register("email", {
                          required: "Email address is required!",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address!",
                          },
                        })}
                      />
                      {errors.email && <p className="bioError">{errors.email.message}</p>}
                      <label htmlFor="firstName" className="form_label">
                        Email
                      </label>
                    </div>
                    {/* <div className="formBioData">
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
                        className="form_input"
                        placeholder=""
                        {...register("password", {
                          required: "Password is required!",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                        })}
                      />
                      {errors.password && <p className="bioError">{errors.password.message}</p>}
                      <label htmlFor="password" className="form_label">
                        Password
                      </label>
                    </div> */}

                    <div className="registerUploadImg">
                      <div
                        className="clickUpload"
                        onClick={() => document.querySelector(".upload_Doc").click()}>
                        <label className="uploadDoc">Upload Passport</label>
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
                  <div className="editCheckVerification">
                    <input
                      type="checkbox"
                      className=""
                      id=""
                      name=""
                      checked={emailVerify}
                      onChange={updateCheck}
                    />
                    <label htmlFor="emailVerified" className="">
                      Verify Email
                    </label>
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="submitBtn editProfileBtn"
                    value="Login"
                    formNoValidate>
                    {isLoading ? <Loading /> : "Submit"}
                  </button>
                  {/* want to place an error so that it does not belong to any field we use root and not
          email or password or any field name */}
                  {/* {errors.root && <p className="error">{errors.root.message}</p>} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdminEmployeeModal;

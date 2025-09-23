import React, { useState, useEffect } from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData } from "../../../Utils/axiosFetch";
import { FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const EditLocation = ({ editUser }) => {
  const { closeEditModal } = useGlobalContext();
  //   const [showPassword, setShowPassword] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [enableOutlet, setEnableOutlet] = useState(editUser.active);
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
    control,
  } = useForm({
    defaultValues: {
      timeRange: { start: "09:00", end: "21:00" },
    },
  });

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: editThisLocation, isLoading } = useMutation({
    mutationFn: async (editThisLocation) =>
      axiosFetchFormData.patch("/admins/adminEditLocation", editThisLocation),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["outletLocation"] });
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
    values.active = enableOutlet;
    values.id = editUser._id;
    try {
      if (imgName && imgName.size > 5000000) {
        return setImgError({ msg: "Outlet Image size must be less than 5MB" });
      }
      const formData = new FormData();
      formData.append("file", imgName);
      formData.append("body", JSON.stringify(values));
      editThisLocation(formData);
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  const updateCheck = () => {
    setEnableOutlet(!enableOutlet);
  };

  useEffect(() => {
    reset({
      OutletName: editUser.OutletName,
      OutletAddress: editUser.OutletAddress,
      phoneNumber: editUser.phoneNumber,
      active: editUser.active,
      category: editUser.category,
      timeRange: editUser.timeRange,
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
                        id="OutletName"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("OutletName", {
                          required: "Outlet Name is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 50,
                            message: "Maximum characters of 50 letters.",
                          },
                          pattern: {
                            value: /^[A-Za-z ]+$/i,
                            message: "Alphabets only!",
                          },
                        })}
                      />
                      {errors.OutletName && <p className="bioError">{errors.OutletName.message}</p>}
                      <label htmlFor="firstName" className="form_label">
                        Outlet Name
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="text"
                        id="OutletAddress"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("OutletAddress", {
                          required: "Outlet Address is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 200,
                            message: "Maximum characters of 200 letters.",
                          },
                        })}
                      />
                      {errors.OutletAddress && (
                        <p className="bioError">{errors.OutletAddress.message}</p>
                      )}
                      <label htmlFor="lastName" className="form_label">
                        Outlet Address
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="Number"
                        id="phoneNumber"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("phoneNumber", {
                          required: "Phone number is required!",
                          minLength: {
                            value: 10,
                            message: "Minimum characters of 10 digits.",
                          },
                          maxLength: {
                            value: 11,
                            message: "Maximum characters of 11 letters.",
                          },
                        })}
                      />
                      {errors.phoneNumber && (
                        <p className="bioError">{errors.phoneNumber.message}</p>
                      )}
                      <label htmlFor="firstName" className="form_label">
                        Phone Number
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="text"
                        id="category"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("category", {
                          required: "State is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 50,
                            message: "Maximum characters of 50 letters.",
                          },
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Alphabets only!",
                          },
                        })}
                      />
                      {errors.category && <p className="bioError">{errors.category.message}</p>}
                      <label htmlFor="firstName" className="form_label">
                        State
                      </label>
                    </div>
                    <div className="formBioData">
                      <Controller
                        name="timeRange"
                        control={control}
                        rules={{
                          validate: (value) =>
                            value.start < value.end || "End time must be after start time",
                        }}
                        render={({ field, fieldState }) => (
                          <div>
                            <div className="">
                              <input
                                type="time"
                                value={field.value.start}
                                onChange={(e) =>
                                  field.onChange({ ...field.value, start: e.target.value })
                                }
                                className="left_time_input"
                              />
                              <input
                                type="time"
                                value={field.value.end}
                                onChange={(e) =>
                                  field.onChange({ ...field.value, end: e.target.value })
                                }
                                className="right_time_input"
                              />
                            </div>
                            {fieldState.error && (
                              <p className="bioError">{fieldState.error.message}</p>
                            )}
                          </div>
                        )}
                      />
                      {errors.fieldState && <p className="bioError">{errors.fieldState.message}</p>}
                    </div>

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
                      id="active"
                      name=""
                      checked={enableOutlet}
                      onChange={updateCheck}
                    />
                    <label htmlFor="emailVerified" className="">
                      Enable Outlet
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

export default EditLocation;

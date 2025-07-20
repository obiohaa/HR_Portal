import React, { useState, useEffect } from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData } from "../../../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import InfoModal from "../../../Components/Modal/InfoModal";
// import capitalizeFirstLetter from "../Components/ToUpperCase";

const EditEmployeeGuaModal = ({ editUser }) => {
  //   console.log(editUser);

  const { closeEditModal, openModal, isModalOpen } = useGlobalContext();
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState({ msg: "" });
  const [imgName, setImgName] = useState(null);
  const [imgError, setImgError] = useState({ msg: "" });
  const [emailOne] = useState(editUser.guarantorOneEmail);
  const [emailTwo] = useState(editUser.guarantorTwoEmail);
  // const [updateData, setUpdateData] = useState("");

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //GET THE BIO DATA RECORD
  // const { isLoading: Loading, error } = useQuery({
  //   queryKey: ["adminBioDataOneKey"],
  //   retryOnMount: true, //do not retry on mount
  //   refetchOnWindowFocus: false, //do not refetch on window focus
  //   refetchOnReconnect: true, //do not refetch on reconnect
  //   refetchOnMount: true, //do not refetch on mount
  //   refetchInterval: false, //do not refetch at intervals
  //   refetchIntervalInBackground: false, //do not refetch in background
  //   queryFn: async () => {
  //     const { data } = await axiosFetch.get("/admins/getAllBioDataPerUser/" + editUser._id);
  //     setUpdateData(data.AllBioDataPerUser[0]);
  //     setPensionStatus(data.AllBioDataPerUser[0].pension);
  //     setMarriageStatus(data.AllBioDataPerUser[0].maritalStatus);
  //     return data;
  //   },
  // });

  // console.log(error);
  // if (error) {
  //   toast.error(
  //     <div>
  //       <span>
  //         {error.response ? error.response.data.msg : "Something went wrong contact Admin"}
  //       </span>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: 8000,
  //       hideProgressBar: true,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       className: "toastBad",
  //     }
  //   );
  // }

  //Using react query to handle the API call to post updated BIO DATA
  const queryClient = useQueryClient();

  const { mutate: updateGuarantor, isLoading } = useMutation({
    mutationFn: async (updateGuarantor) =>
      axiosFetchFormData.patch("/admins/updateGuarantor", updateGuarantor),
    onSuccess: (data) => {
      console.log(data);
      reset();
      setFileName(null);
      setImgName(null);
      closeEditModal();
      queryClient.invalidateQueries({ queryKey: ["adminGuaData"] });
      toast.success("Guarantor form updated successfully", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
      // reset();
    },
    onError: (error) => {
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 10000,
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
    values.id = editUser._id;
    try {
      if (imgName && imgName.size > 5000000) {
        setImgName(null);
        setImgError({ msg: "File size must be less than 5MB" });
        return;
      }
      if (fileName && fileName.size > 5000000) {
        setFileName(null);
        setFileError({ msg: "File size must be less than 5MB" });
        return;
      }
      const formData = new FormData();
      formData.append("file", fileName);
      formData.append("img", imgName);
      formData.append("body", JSON.stringify(values));
      console.log(formData);
      updateGuarantor(formData);
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };
  //   console.log(updateData);
  useEffect(() => {
    reset({
      fullName: editUser ? editUser.fullName : "Full Name",
      phoneNumber: editUser ? editUser.phoneNumber : "Phone Number",
      employer: editUser ? editUser.employer : "Employer",
      occupation: editUser ? editUser.occupation : "Occupation",
      guarantorTwoEmail: editUser ? editUser.guarantorTwoEmail : "Guarantor Email",
      guarantorOneEmail: editUser ? editUser.guarantorOneEmail : "Guarantor Email",
      houseAddress: editUser ? editUser.houseAddress : "House Address",
      employerAddress: editUser ? editUser.employerAddress : "Employer Address",
      ageRange: editUser ? editUser.ageRange : "Age Range",
      uniformedPublicServant: editUser ? editUser.uniformedPublicServant : "Uniform Public Servant",
      employeeFullName: editUser ? editUser.employeeFullName : "Employee Full Name",
      employeeDesignation: editUser ? editUser.employeeDesignation : "Employee Designation",
      outletEmployed: editUser ? editUser.outletEmployed : "Outlet Employed",
      signedPolicy: editUser ? editUser.signedPolicy : "Signed Policy",
    });
  }, [reset, editUser]);

  if (isLoading || !editUser) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      {isModalOpen && <InfoModal />}
      <div className="bioModal">
        <FaX className="cancelEdit" onClick={closeEditModal} />
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <form
                action=""
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                noValidate>
                <div className="mainGuarantorFormBody">
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="fullName"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("fullName", {
                        required: "Full Name is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.fullName && <p className="bioError">{errors.fullName.message}</p>}
                    <label htmlFor="fullName" className="form_label">
                      Full Name
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="houseAddress"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("houseAddress", {
                        required: "House address is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 200,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.houseAddress && (
                      <p className="bioError">{errors.houseAddress.message}</p>
                    )}

                    <label htmlFor="houseAddress" className="form_label">
                      House Address
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="Number"
                      id="phoneNumber"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("phoneNumber", {
                        required: "Phone number is required!",
                        minLength: {
                          value: 10,
                          message: "Minimum characters of 10.",
                        },
                        maxLength: {
                          value: 14,
                          message: "Maximum characters of 14 letters.",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Numbers only!",
                        },
                      })}
                    />
                    {errors.phoneNumber && <p className="bioError">{errors.phoneNumber.message}</p>}
                    <label htmlFor="phoneNumber" className="form_label">
                      Phone Number
                    </label>
                  </div>
                  {emailOne && (
                    <div className="formBioData">
                      <input
                        name="guarantorOneEmail"
                        type="email"
                        id="guarantorOneEmail"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        disabled
                        {...register("guarantorOneEmail", {
                          required: "Email address is required!",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address!",
                          },
                        })}
                      />
                      <label htmlFor="guarantorOneEmail" className="form_label">
                        Email One
                      </label>
                    </div>
                  )}
                  {emailTwo && (
                    <div className="formBioData">
                      <input
                        name="guarantorTwoEmail"
                        type="email"
                        id="guarantorTwoEmail"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        disabled
                        {...register("guarantorTwoEmail", {
                          required: "Email address is required!",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address!",
                          },
                        })}
                      />
                      <label htmlFor="guarantorTwoEmail" className="form_label">
                        Email Two
                      </label>
                    </div>
                  )}
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="occupation"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("occupation", {
                        required: "Occupation is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.occupation && <p className="bioError">{errors.occupation.message}</p>}
                    <label htmlFor="occupation" className="form_label">
                      Occupation
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="employer"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("employer", {
                        required: "Employer is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.employer && <p className="bioError">{errors.employer.message}</p>}
                    <label htmlFor="employer" className="form_label">
                      Employer
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="employerAddress"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("employerAddress", {
                        required: "Employer Address is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 200,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.employerAddress && (
                      <p className="bioError">{errors.employerAddress.message}</p>
                    )}
                    <label htmlFor="employerAddress" className="form_label">
                      Employer Address
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="employeeFullName"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("employeeFullName", {
                        required: "Employee Full Name is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.employeeFullName && (
                      <p className="bioError">{errors.employeeFullName.message}</p>
                    )}
                    <label htmlFor="employeeFullName" className="form_label">
                      Employee Full Name
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="employeeDesignation"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("employeeDesignation", {
                        required: "Employee Designation is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.employeeDesignation && (
                      <p className="bioError">{errors.employeeDesignation.message}</p>
                    )}
                    <label htmlFor="employeeDesignation" className="form_label">
                      Employee Designation
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
                    <input
                      type="text"
                      id="outletEmployed"
                      className="form_input"
                      placeholder=""
                      autoComplete="off"
                      formNoValidate
                      {...register("outletEmployed", {
                        required: "Outlet Employed is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Maximum characters of 20 letters.",
                        },
                      })}
                    />
                    {errors.outletEmployed && (
                      <p className="bioError">{errors.outletEmployed.message}</p>
                    )}
                    <label htmlFor="outletEmployed" className="form_label">
                      Outlet Employed
                    </label>
                  </div>
                  <div className="mainGuarantorFormField selectFormBioData">
                    <select
                      id="ageRange"
                      className="form_input"
                      {...register("ageRange", {
                        required: "Age range is required!",
                      })}>
                      <option value="">25 - 55 years old</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.ageRange && <p className="bioError">{errors.ageRange.message}</p>}
                    <label htmlFor="ageRange" className="form_label">
                      Age Range
                    </label>
                  </div>
                  <div className="mainGuarantorFormField selectFormBioData">
                    <select
                      id="uniformedPublicServant"
                      className="form_input"
                      {...register("uniformedPublicServant", {
                        required: "Age range is required!",
                      })}>
                      <option value="">Uniform Public Servant</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.uniformedPublicServant && (
                      <p className="bioError">{errors.uniformedPublicServant.message}</p>
                    )}
                    <label htmlFor="uniformedPublicServant" className="form_label">
                      Uniform Public Servant
                    </label>
                  </div>
                  <div className="mainGuarantorFormField selectFormBioData">
                    <select
                      id="signedPolicy"
                      className="form_input"
                      {...register("signedPolicy", {
                        required: "Accept Agreement is required!",
                      })}>
                      <option value="">Accept Agreement</option>
                      <option value="Yes">Yes</option>
                    </select>
                    {!errors.signedPolicy && (
                      <p onClick={openModal} className="agreementModal">
                        Click here to view agreement
                      </p>
                    )}
                    {errors.signedPolicy && (
                      <p className="bioError">{errors.signedPolicy.message}</p>
                    )}
                    <label htmlFor="signedPolicy" className="form_label">
                      Select Yes to Accept Agreement
                    </label>
                  </div>
                  <div className="mainGuarantorFormField">
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
                  <div className="mainGuarantorFormField">
                    <div
                      className="clickUpload"
                      onClick={() => document.querySelector(".upload_ID").click()}>
                      <label className="uploadDoc">Upload ID Card</label>
                      <MdCloudUpload className="uploadIcon" />
                    </div>
                    <div className="fileName">
                      {/* {fileName}{" "} */}
                      {fileName === null ? (
                        ""
                      ) : (
                        <div className="fileDetails">
                          {fileName.name}
                          {
                            <MdDelete
                              className="deleteUpload"
                              onClick={() => {
                                setFileName(null);
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
                      className="upload_ID"
                      accept=".png, .jpeg, .jpg"
                      // accept=".pdf, .docx, .docx, .odt"
                      required
                      hidden
                      onChange={({ target: { files } }) => {
                        setFileError({ msg: "" });
                        files[0] && setFileName(files[0]);
                      }}
                    />
                    {fileError.msg !== "" && <p className="bioError">{fileError.msg}</p>}
                  </div>
                </div>
                <div className=" pushDownBtn">
                  <button className="btn" onClick={closeEditModal} type="button">
                    CANCEL
                  </button>
                  <button type="submit" className="btn">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeGuaModal;

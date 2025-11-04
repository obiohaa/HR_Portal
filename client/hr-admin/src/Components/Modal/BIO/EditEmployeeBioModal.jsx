import React, { useState, useEffect } from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { axiosFetchFormData, axiosFetch } from "../../../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
// import capitalizeFirstLetter from "../Components/ToUpperCase";

import {
  stateCapital,
  genderOptions,
  maritalStatus,
  pension,
  levelOfEducation,
  bank,
  bankNames,
} from "../../UserData";

const EditEmployeeBioModal = ({ editUser }) => {
  // console.log(editUser);
  const { closeEditModal } = useGlobalContext();
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState({ msg: "" });
  const [marriageStatus, setMarriageStatus] = useState("");
  const [pensionStatus, setPensionStatus] = useState("");
  const [bankStatus, setBankStatus] = useState("");
  // const [updateData, setUpdateData] = useState("");

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //GET LOCATION RECORD
  const {
    isLoading: Loading,
    error,
    data,
  } = useQuery({
    queryKey: ["adminBioDataOneKeys"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/admins/getAllOutletLocation");
      return data;
    },
  });
  // console.log(error);

  if (error) {
    toast.error(
      <div>
        <span>
          {error.response ? error.response.data.msg : "Something went wrong contact Admin"}
        </span>
      </div>,
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      }
    );
  }

  //Using react query to handle the API call to post updated BIO DATA
  const queryClient = useQueryClient();
  const { mutate: updateBioData, isLoading } = useMutation({
    mutationFn: async (updateBioData) =>
      axiosFetchFormData.patch("/admins/updateOneBioData", updateBioData),
    onSuccess: (data) => {
      // console.log(data.data.user);
      closeEditModal();
      //   reset();
      //   setFileName(null);
      //   closeEditModal()
      queryClient.invalidateQueries({ queryKey: ["adminBioDataOneKey"] });
      toast.success(data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
      //   reset();
      //   setFileName(null);
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
    values.id = editUser._id;
    try {
      if (fileName && fileName.size > 5000000) {
        return setFileError({ msg: "File size must be less than 5MB" });
      }
      const formData = new FormData();
      formData.append("file", fileName);
      formData.append("body", JSON.stringify(values));
      // console.log(formData);
      updateBioData(formData);
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
    setPensionStatus(editUser.pension);
    setMarriageStatus(editUser.maritalStatus);
    setBankStatus(editUser.bank);

    reset({
      firstName: editUser ? editUser.firstName : "firstName",
      lastName: editUser ? editUser.lastName : "lastName",
      middleName: editUser ? editUser.middleName : "middleName",
      staffId: editUser ? editUser.staffId : "Staff ID",
      jobLocation: editUser ? editUser.jobLocation : "Job Location",
      jobName: editUser ? editUser.jobName : "Job Name",
      bank: editUser ? editUser.bank : "Bank Account",
      bankAccountNumber: editUser ? editUser.bankAccountNumber : "Bank Account Number",
      bankName: editUser ? editUser.bankName : "Bank Name",
      dateOfBirth: editUser ? editUser.dateOfBirth.split("T")[0] : "Date Of Birth",
      email: editUser ? editUser.email : "email",
      gender: editUser ? editUser.gender : "gender",
      houseAddress: editUser ? editUser.houseAddress : "House Address",
      maritalStatus: editUser ? editUser.maritalStatus : "Marital Status",
      pension: editUser ? editUser.pension : "pension",
      phoneNumber: editUser ? editUser.phoneNumber : "Phone Number",
      state_of_origin: editUser ? editUser.state_of_origin : "State",
      spouseName: editUser ? editUser.spouseName : "Spouse Name",
      pensionCompany: editUser ? editUser.pensionCompany : "Pension Company",
      pensionPin: editUser ? editUser.pensionPin : "Pension Pin",
      levelOfEducation: editUser ? editUser.levelOfEducation : "Level Of Education",
    });
  }, [reset, editUser]);

  //handles marriage status state
  const handleChange = (event) => {
    setMarriageStatus(event.target.value);
  };

  //handles pension status
  const handlePensionChange = (event) => {
    setPensionStatus(event.target.value);
  };

  //handles bank status state
  const handleBankChange = (event) => {
    setBankStatus(event.target.value);
  };

  if (isLoading || !editUser) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
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
                <div className="formContainer">
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
                      id="middleName"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      formNoValidate
                      {...register("middleName", {
                        //   required: "Middle Name is required!",
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
                    {errors.middleName && <p className="bioError">{errors.middleName.message}</p>}
                    <label htmlFor="middleName" className="form_label">
                      Middle Name
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
                      type="text"
                      id="staffId"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      formNoValidate
                      {...register("staffId", {
                        required: "Staff Id is required!",
                        minLength: {
                          value: 13,
                          message: "Minimum characters of 13 letters.",
                        },
                        maxLength: {
                          value: 13,
                          message: "Maximum characters of 13 letters.",
                        },
                        pattern: {
                          value: /^[A-Z]{2}\/\d{2}\/\d{2}\/\d{4}$/,
                          message: "Format must be like TP/22/07/1234",
                        },
                      })}
                    />
                    {errors.staffId && <p className="bioError">{errors.staffId.message}</p>}
                    <label htmlFor="staffId" className="form_label">
                      Staff ID
                    </label>
                  </div>
                  <div className="formBioData selectFormBioData">
                    <select
                      name="jobLocation"
                      id="jobLocation"
                      className="form_input"
                      autoComplete="off"
                      defaultValue=""
                      {...register("jobLocation", {
                        required: "Job Location is required!",
                      })}>
                      <option value="" disabled>
                        Select a Location
                      </option>
                      {data?.AllOutletLocations.map((location) => (
                        <option key={location.OutletName} value={location.OutletName}>
                          {location.OutletName}
                        </option>
                      ))}
                    </select>
                    {errors.jobLocation && <p className="bioError">{errors.jobLocation.message}</p>}
                    <label htmlFor="jobLocation" className="form_label">
                      Job Location
                    </label>
                  </div>
                  <div className="formBioData">
                    <input
                      type="text"
                      id="jobName"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      formNoValidate
                      {...register("jobName", {
                        required: "Job Name is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 40,
                          message: "Maximum characters of 40 letters.",
                        },
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Alphabets only!",
                        },
                      })}
                    />
                    {errors.jobName && <p className="bioError">{errors.jobName.message}</p>}
                    <label htmlFor="jobName" className="form_label">
                      Job Name
                    </label>
                  </div>
                  <div className="formBioData">
                    <input
                      type="date"
                      id="dateOfBirth"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      formNoValidate
                      {...register("dateOfBirth", {
                        required: "Date of Birth is required!",
                        // validate: {
                        //   isFutureDate: (value) =>
                        //     new Date(value) < new Date() || "Date must be in the past",
                        // },
                      })}
                    />
                    {errors.dateOfBirth && <p className="bioError">{errors.dateOfBirth.message}</p>}
                    <label htmlFor="dateOfBirth" className="form_label">
                      Date of Birth
                    </label>
                  </div>
                  <div className="formBioData selectFormBioData">
                    <select
                      name="state_of_origin"
                      id="state_of_origin"
                      className="form_input"
                      autoComplete="off"
                      {...register("state_of_origin", {
                        required: "State of Origin is required!",
                        validate: {
                          isValidState: () =>
                            stateCapital.some((state) => state.state === state.value) ||
                            "Invalid state selected",
                        },
                      })}>
                      {stateCapital.map((state) => (
                        <option key={state.id} value={state.value}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                    {errors.state_of_origin && (
                      <p className="bioError">{errors.state_of_origin.message}</p>
                    )}
                    <label htmlFor="dateOfBirth" className="form_label">
                      State of Origin
                    </label>
                  </div>
                  <div className="formBioData selectFormBioData">
                    <select
                      name="gender"
                      id="gender"
                      className="form_input"
                      {...register("gender", {
                        required: "Gender is required!",
                        validate: {
                          isValidState: () =>
                            genderOptions.some((gender) => gender.gender === gender.value) ||
                            "Invalid gender selected",
                        },
                      })}>
                      {genderOptions.map((gender) => {
                        return (
                          <option key={gender.id} value={gender.value}>
                            {gender.gender}
                          </option>
                        );
                      })}
                    </select>
                    {errors.gender && <p className="bioError">{errors.gender.message}</p>}
                    <label htmlFor="gender" className="form_label">
                      Gender
                    </label>
                  </div>
                  <div className="formBioData selectFormBioData">
                    <select
                      name="maritalStatus"
                      id="maritalStatus"
                      className="form_input"
                      placeholder="Select an option"
                      {...register("maritalStatus", {
                        required: "Marital status is required!",
                        validate: {
                          isValidState: () =>
                            maritalStatus.some((status) => status.status === status.value) ||
                            "Invalid Marital status selected",
                        },
                      })}
                      onChange={handleChange}>
                      {maritalStatus.map((status) => {
                        return (
                          <option key={status.id} value={status.value}>
                            {status.status}
                          </option>
                        );
                      })}
                    </select>
                    {errors.maritalStatus && (
                      <p className="bioError">{errors.maritalStatus.message}</p>
                    )}
                    <label htmlFor="gender" className="form_label">
                      Marital Status
                    </label>
                  </div>
                  {marriageStatus === "Married" && (
                    <div className="formBioData">
                      <input
                        type="text"
                        id="spouseName"
                        name="spouseName"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        {...register("spouseName", {
                          required: "Spouse name is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximum characters of 20 letters.",
                          },
                        })}
                      />
                      {errors.spouseName && <p className="bioError">{errors.spouseName.message}</p>}
                      <label htmlFor="spouseName" className="form_label">
                        Spouse Name
                      </label>
                    </div>
                  )}
                  <div className="formBioData">
                    <input
                      type="text"
                      id="houseAddress"
                      name="houseAddress"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      {...register("houseAddress", {
                        required: "House address is required!",
                        minLength: {
                          value: 3,
                          message: "Minimum characters of 2 letters.",
                        },
                        maxLength: {
                          value: 100,
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
                  <div className="formBioData">
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      {...register("phoneNumber", {
                        required: "Phone number is required!",
                        minLength: {
                          value: 10,
                          message: "Minimum characters of 10 numbers.",
                        },
                        maxLength: {
                          value: 14,
                          message: "Maximum characters of 14 numbers.",
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
                  <div className="formBioData">
                    <input
                      name="email"
                      type="email"
                      id="email"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      disabled
                      {...register("email", {
                        required: "Email address is required!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address!",
                        },
                      })}
                    />
                    <label htmlFor="email" className="form_label">
                      Email Address
                    </label>
                  </div>
                  <div className="formBioData selectFormBioData">
                    <select
                      name="bank"
                      id="bank"
                      className="form_input"
                      // {...register("bank")}
                      {...register("bank", {
                        required: "bank status is required!",
                        validate: {
                          isValidState: () =>
                            bank.some((bak) => bak.bank === bak.value) ||
                            "Invalid bank status selected",
                        },
                      })}
                      onChange={handleBankChange}>
                      {bank.map((ban) => {
                        return (
                          <option key={ban.id} value={ban.value}>
                            {ban.bank}
                          </option>
                        );
                      })}
                    </select>
                    {errors.bank && <p className="bioError">{errors.bank.message}</p>}
                    <label htmlFor="bank" className="form_label">
                      Bank
                    </label>
                  </div>

                  {bankStatus === "Yes" && (
                    <div className="formBioData selectFormBioData">
                      <select
                        name="bankName"
                        id="bankName"
                        className="form_input"
                        // {...register("bank")}
                        {...register("bankName", {
                          required: "Bank name status is required!",
                          validate: {
                            isValidState: () =>
                              bankNames.some((bakName) => bakName.bank === bakName.value) ||
                              "Invalid bank name selected",
                          },
                        })}>
                        {bankNames.map((ban) => {
                          return (
                            <option key={ban.id} value={ban.value}>
                              {ban.bank}
                            </option>
                          );
                        })}
                      </select>
                      {errors.bankName && <p className="bioError">{errors.bankName.message}</p>}
                      <label htmlFor="bankName" className="form_label">
                        Bank Name
                      </label>
                    </div>
                  )}
                  {bankStatus === "Yes" && (
                    <div className="formBioData">
                      <input
                        type="number"
                        id="bankAccountNumber"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        {...register("bankAccountNumber", {
                          required: "Bank account number is required!",
                          minLength: {
                            value: 10,
                            message: "Minimum characters of 10 letters.",
                          },
                          maxLength: {
                            value: 10,
                            message: "Maximum characters of 10 letters.",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Numbers only!",
                          },
                        })}
                      />
                      {errors.bankAccountNumber && (
                        <p className="bioError">{errors.bankAccountNumber.message}</p>
                      )}
                      <label htmlFor="bankAccountNumber" className="form_label">
                        Bank Account Number
                      </label>
                    </div>
                  )}
                  <div className="formBioData selectFormBioData">
                    <select
                      name="pension"
                      id="pension"
                      className="form_input"
                      placeholder="Select an option"
                      {...register("pension", {
                        required: "Pension is required!",
                        validate: {
                          isValidState: () =>
                            pension.some((pen) => pen.pension === pen.value) ||
                            "Invalid Marital status selected",
                        },
                      })}
                      onChange={handlePensionChange}>
                      {pension.map((pen) => {
                        return (
                          <option key={pen.id} value={pen.value}>
                            {pen.pension}
                          </option>
                        );
                      })}
                    </select>
                    {errors.pension && <p className="bioError">{errors.pension.message}</p>}
                    <label htmlFor="gender" className="form_label">
                      Pension
                    </label>
                  </div>
                  {pensionStatus === "Yes" && (
                    <div className="formBioData">
                      <input
                        type="text"
                        id="pensionCompany"
                        name="pensionCompany"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        {...register("pensionCompany", {
                          required: "Pension Company is required!",
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
                      {errors.pensionCompany && (
                        <p className="bioError">{errors.pensionCompany.message}</p>
                      )}
                      <label htmlFor="pensionCompany" className="form_label">
                        Pension Company
                      </label>
                    </div>
                  )}
                  {pensionStatus === "Yes" && (
                    <div className="formBioData">
                      <input
                        type="number"
                        id="pensionPin"
                        name="pensionPin"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        {...register("pensionPin", {
                          required: "Pension PIN number is required!",
                          minLength: {
                            value: 5,
                            message: "Minimum characters of 5 letters.",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximum characters of 20 letters.",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Numbers only!",
                          },
                        })}
                      />
                      {errors.pensionPin && <p className="bioError">{errors.pensionPin.message}</p>}
                      <label htmlFor="pensionPin" className="form_label">
                        Pension Pin
                      </label>
                    </div>
                  )}
                  <div className="formBioData selectFormBioData">
                    <select
                      name="levelOfEducation"
                      id="levelOfEducation"
                      className="form_input"
                      {...register("levelOfEducation", {
                        required: "Level of Education is required!",
                        validate: {
                          isValidState: () =>
                            levelOfEducation.some(
                              (levelOfEducation) =>
                                levelOfEducation.level === levelOfEducation.value
                            ) || "Invalid Level of Education selected",
                        },
                      })}>
                      {levelOfEducation.map((edu) => {
                        return (
                          <option key={edu.id} value={edu.value}>
                            {edu.level}
                          </option>
                        );
                      })}
                    </select>
                    {errors.levelOfEducation && (
                      <p className="bioError">{errors.levelOfEducation.message}</p>
                    )}
                    <label htmlFor="levelOfEducation" className="form_label">
                      Level of Education
                    </label>
                  </div>
                  <div className="formBioData">
                    <div
                      className="clickUpload"
                      onClick={() => document.querySelector(".upload_Doc").click()}>
                      <label className="uploadDoc">Upload CV</label>
                      <MdCloudUpload className="uploadIcon" />
                    </div>
                    <div className="fileName">
                      {/* {fileName}{" "} */}
                      {fileName === null ? (
                        ""
                      ) : (
                        <div>
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
                      className="upload_Doc"
                      // accept=".png, .jpeg, .jpg"
                      accept=".pdf, .png, .jpeg, .jpg"
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
                <div className="btns">
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

export default EditEmployeeBioModal;

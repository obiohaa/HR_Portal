import React, { useState } from "react";
import { axiosFetchFormData } from "../../../Utils/axiosFetch";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../../Context/userContext";
import capitalizeFirstLetter from "../../../Components/ToUpperCase";
import { MdCloudUpload, MdDelete } from "react-icons/md";

import {
  stateCapital,
  genderOptions,
  maritalStatus,
  pension,
  levelOfEducation,
} from "../../../Components/UserData";

//When i have onChange in a select field, the react-hook-form validation does not work, i guess because it uses onChange function too. To validate i used my custom validation.

const BioData = ({ step, totalSteps, setStep }) => {
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState({ msg: "" });
  const [marriageStatus, setMarriageStatus] = useState("");
  const [pensionStatus, setPensionStatus] = useState("");
  const { user } = useGlobalContext();
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    console.log("he click submit");
    try {
      if (fileName === null) {
        setFileError({ msg: "CV is required" });
      } else if (fileName.size > 5000000) {
        setFileError({ msg: "File size must be less than 5MB" });
      } else {
        console.log(values);
        const formData = new FormData();
        formData.append("file", fileName);
        formData.append("body", JSON.stringify(values));
        console.log(formData);
        axiosFetchFormData
          .post("/users/bioData", formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
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

  const handleChange = (event) => {
    console.log(event.target.value);
    setMarriageStatus(event.target.value);
  };

  const handlePensionChange = (event) => {
    setPensionStatus(event.target.value);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="formsContainerBody">
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
              disabled
              value={user ? `${capitalizeFirstLetter(user.firstName)}` : ""}
              autoComplete="off"
              formNoValidate
              // {...register("firstName", {
              //   required: "First Name is required!",
              //   minLength: {
              //     value: 2,
              //     message: "Minimum characters of 2 letters.",
              //   },
              //   maxLength: {
              //     value: 20,
              //     message: "Maximum characters of 20 letters.",
              //   },
              //   pattern: {
              //     value: /^[A-Za-z]+$/i,
              //     message: "Alphabets only!",
              //   },
              // })}
            />
            {/* {errors.firstName && <p className="bioError">{errors.firstName.message}</p>} */}
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
                // required: "Middle Name is required!",
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
              disabled
              value={user ? `${capitalizeFirstLetter(user.lastName)}` : ""}
              autoComplete="off"
              formNoValidate
              // {...register("lastName", {
              //   required: "Last Name is required!",
              //   minLength: {
              //     value: 2,
              //     message: "Minimum characters of 2 letters.",
              //   },
              //   maxLength: {
              //     value: 20,
              //     message: "Maximum characters of 20 letters.",
              //   },
              //   pattern: {
              //     value: /^[A-Za-z]+$/i,
              //     message: "Alphabets only!",
              //   },
              // })}
            />
            {/* {errors.lastName && <p className="bioError">{errors.lastName.message}</p>} */}
            <label htmlFor="lastName" className="form_label">
              Last Name
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
                validate: {
                  isFutureDate: (value) =>
                    new Date(value) < new Date() || "Date must be in the past",
                },
              })}
            />
            {errors.date && <p className="bioError">{errors.date.message}</p>}
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
            {errors.state_of_origin && <p className="bioError">{errors.state_of_origin.message}</p>}
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
            {errors.maritalStatus && <p className="bioError">{errors.maritalStatus.message}</p>}
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
            {errors.houseAddress && <p className="bioError">{errors.houseAddress.message}</p>}
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
                  message: "Minimum characters of 2 letters.",
                },
                maxLength: {
                  value: 14,
                  message: "Maximum characters of 20 letters.",
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
              id="emailAddress"
              className="form_input"
              disabled
              value={user ? `${capitalizeFirstLetter(user.email)}` : ""}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="emailAddress" className="form_label">
              Email Address
            </label>
          </div>
          <div className="formBioData">
            <input
              type="text"
              id="bankName"
              name="bankName"
              className="form_input"
              placeholder=" "
              autoComplete="off"
              {...register("bankName", {
                required: "Bank name is required!",
                minLength: {
                  value: 3,
                  message: "Minimum characters of 3 letters.",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum characters of 30 letters.",
                },
              })}
            />
            {errors.bankName && <p className="bioError">{errors.bankName.message}</p>}
            <label htmlFor="bankName" className="form_label">
              Bank Name
            </label>
          </div>

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
                  value: 11,
                  message: "Minimum characters of 11 letters.",
                },
                maxLength: {
                  value: 11,
                  message: "Maximum characters of 11 letters.",
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
          <div className="formBioData selectFormBioData">
            <select
              name="pension"
              id="pension"
              className="form_input"
              {...register("pension")}
              onChange={handlePensionChange}>
              {pension.map((pen) => {
                return (
                  <option key={pen.id} value={pen.pension}>
                    {pen.pension}
                  </option>
                );
              })}
            </select>
            <label htmlFor="gender" className="form_label">
              pension
            </label>
          </div>
          {pensionStatus === "Yes, i have a pension account" && (
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
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Alphabets only!",
                  },
                })}
              />
              {errors.pensionCompany && <p className="bioError">{errors.pensionCompany.message}</p>}
              <label htmlFor="pensionCompany" className="form_label">
                Pension Company
              </label>
            </div>
          )}
          {pensionStatus === "Yes, i have a pension account" && (
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
                      (levelOfEducation) => levelOfEducation.level === levelOfEducation.value
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
              accept=".pdf, .docx, .docx, .odt"
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
          <button
            className={`${step <= 1 ? "disabled" : "btn"}`}
            onClick={handlePrev}
            disabled={step <= 1 && true}>
            Prev
          </button>
          <button
            type="submit"
            className={`${step === totalSteps ? "disabled" : "btn"}`}
            disabled={isSubmitting && step >= 4 ? true : false}
            onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default BioData;

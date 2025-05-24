import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  stateCapital,
  genderOptions,
  maritalStatus,
  pension,
  levelOfEducation,
} from "../../../Components/UserData";
// import { useForm } from "react-hook-form";

const BioData = () => {
  const [marriageStatus, setMarriageStatus] = useState("");
  const [pensionStatus, setPensionStatus] = useState("");

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

  const handleChange = (event) => {
    setMarriageStatus(event.target.value);
  };

  const handlePensionChange = (event) => {
    setPensionStatus(event.target.value);
  };

  return (
    <div className="bioDataContainer">
      <form action="" className="formContainer" autoComplete="off" noValidate>
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
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
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
              required: "Middle Name is required!",
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
          {errors.middleName && <p className="error">{errors.middleName.message}</p>}
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
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
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
                isFutureDate: (value) => new Date(value) < new Date() || "Date must be in the past",
              },
            })}
          />
          {errors.date && <p className="error">{errors.date.message}</p>}
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
              <option key={state.id} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
          {errors.state_of_origin && <p className="error">{errors.state_of_origin.message}</p>}
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
                <option key={gender.id} value={gender.gender}>
                  {gender.gender}
                </option>
              );
            })}
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
          <label htmlFor="gender" className="form_label">
            Gender
          </label>
        </div>
        <div className="formBioData selectFormBioData">
          <select
            name="maritalStatus"
            id="maritalStatus"
            className="form_input"
            {...register("maritalStatus", {
              required: "Marital status is required!",
              validate: {
                isValidState: () =>
                  maritalStatus.some(
                    (maritalStatus) => maritalStatus.status === maritalStatus.value
                  ) || "Invalid status selected",
              },
            })}
            onChange={handleChange}>
            {maritalStatus.map((status) => {
              return (
                <option key={status.id} value={status.status}>
                  {status.status}
                </option>
              );
            })}
          </select>
          {errors.maritalStatus && <p className="error">{errors.maritalStatus.message}</p>}
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
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Alphabets only!",
                },
              })}
            />
            {errors.spouseName && <p className="error">{errors.spouseName.message}</p>}
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
          {errors.houseAddress && <p className="error">{errors.houseAddress.message}</p>}
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
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
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
                value: 10,
                message: "Minimum characters of 2 letters.",
              },
              maxLength: {
                value: 30,
                message: "Maximum characters of 20 letters.",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Alphabets only!",
              },
            })}
          />
          {errors.bankName && <p className="error">{errors.bankName.message}</p>}
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
          {errors.bankAccountNumber && <p className="error">{errors.bankAccountNumber.message}</p>}
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
                  value: 30,
                  message: "Maximum characters of 20 letters.",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Alphabets only!",
                },
              })}
            />
            {errors.pensionCompany && <p className="error">{errors.pensionCompany.message}</p>}
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
            {errors.pensionPin && <p className="error">{errors.pensionPin.message}</p>}
            <label htmlFor="pensionPin" className="form_label">
              Pension Pin
            </label>
          </div>
        )}
        <div className="formBioData selectFormBioData">
          <select name="levelOfEducation" id="pension" className="form_input">
            {levelOfEducation.map((edu) => {
              return (
                <option key={edu.id} value={edu.level}>
                  {edu.level}
                </option>
              );
            })}
          </select>
          <label htmlFor="levelOfEducation" className="form_label">
            Level of Education
          </label>
        </div>
        <div className="formBioData">
          <input
            type="file"
            id="passportImg"
            className="form_input"
            placeholder=" "
            autoComplete="off"
          />
          <label htmlFor="passportImg" className="form_label">
            Upload Passport Image
          </label>
        </div>
        <div className="formBioData">
          <input type="file" id="cv" className="form_input" placeholder=" " autoComplete="off" />
          <label htmlFor="cv" className="form_label">
            Upload CV
          </label>
        </div>
      </form>
    </div>
  );
};
export default BioData;

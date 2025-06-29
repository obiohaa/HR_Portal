import React from "react";
import { axiosFetch } from "../../../Utils/axiosFetch";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../../Context/userContext";
// import capitalizeFirstLetter from "../../../Components/ToUpperCase";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PageLoading from "../../../Components/Checks/PageLoading";
import Modal from "../../../Components/Modal/Modal";
import { genderOptions } from "../../../Components/UserData";
//When i have onChange in a select field, the react-hook-form validation does not work, i guess because it uses onChange function too. To validate i used my custom validation.

const Next_of_kin = () => {
  const { userStepState } = useGlobalContext();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  //Using react query to handle the API call. API call for POSTING NOK
  const queryClient = useQueryClient();
  const { mutate: nextOfKinUser, isLoading } = useMutation({
    mutationFn: async (nextOfKinUser) => axiosFetch.post("/users/nextOfKinData", nextOfKinUser),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
      toast.success(data.data.steps.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
      reset();
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

  //API CALL FOR CHANGING STEP VIEW
  const { mutate: previousStep } = useMutation({
    mutationFn: async (previousStep) =>
      axiosFetch.post("/users/updateUserPrevStepState", { previousStep }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
      toast.success(data.data.steps.msg, {
        position: "top-center",
        autoClose: 5000,
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

  const goPrev = (event) => {
    event.preventDefault();
    previousStep();
  };

  const onSubmit = async (values) => {
    try {
      // console.log(values);
      nextOfKinUser(values);
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  // const handleNext = () => {
  //   if (step < 4) {
  //     setStep(step + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (step > 1) {
  //     setStep(step - 1);
  //   }
  // };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="formsContainerBody">
      {userStepState && userStepState.completedStep >= 2 ? (
        <Modal />
      ) : (
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
                id="nextOfKinFirstName"
                className="form_input"
                placeholder=" "
                autoComplete="off"
                formNoValidate
                {...register("nextOfKinFirstName", {
                  required: "Next of Kin's first name is required!",
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
              {errors.nextOfKinFirstName && (
                <p className="bioError">{errors.nextOfKinFirstName.message}</p>
              )}
              <label htmlFor="nextOfKinFirstName" className="form_label">
                NOK First Name
              </label>
            </div>
            <div className="formBioData">
              <input
                type="text"
                id="nextOfKinLastName"
                className="form_input"
                placeholder=" "
                autoComplete="off"
                formNoValidate
                {...register("nextOfKinLastName", {
                  required: "Next of Kin's Last Name is required!",
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
              {errors.nextOfKinLastName && (
                <p className="bioError">{errors.nextOfKinLastName.message}</p>
              )}
              <label htmlFor="nextOfKinLastName" className="form_label">
                NOK Last Name
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
                type="text"
                id="nextOfKinRelationship"
                name="nextOfKinRelationship"
                className="form_input"
                placeholder=" "
                autoComplete="off"
                {...register("nextOfKinRelationship", {
                  required: "NOK relationship is required!",
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
              {errors.nextOfKinRelationship && (
                <p className="bioError">{errors.nextOfKinRelationship.message}</p>
              )}
              <label htmlFor="bankName" className="form_label">
                NOK Relationship
              </label>
            </div>
          </div>
          <div className="NOKbtns">
            <button className="btn" onClick={goPrev}>
              Prev
            </button>
            <button type="submit" className="btn">
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Next_of_kin;

import React, { useEffect } from "react";
import "../component.css";
import PageLoading from "../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData } from "../../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
// import capitalizeFirstLetter from "../Components/ToUpperCase";

import { genderOptions } from "../UserData";

const EditNOKModal = ({ userNOK }) => {
  const { closeModal } = useGlobalContext();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: updateNOKData, isLoading } = useMutation({
    mutationFn: async (updateNOKData) =>
      axiosFetchFormData.patch("/users/updateNOKData", updateNOKData),
    onSuccess: (data) => {
      reset();
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["nokUser"] });
      toast.success(data.data.msg, {
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

  const onSubmit = async (values) => {
    try {
      // console.log(values);
      updateNOKData(values);
      // reset();
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    reset({
      firstName: userNOK.nextOfKinFirstName,
      lastName: userNOK.nextOfKinLastName,
      relationship: userNOK.nextOfKinRelationship,
      gender: userNOK.gender,
      houseAddress: userNOK.houseAddress,
      phoneNumber: userNOK.phoneNumber,
    });
  }, [reset, userNOK]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      <div className="bioModal">
        <FaX className="cancelEdit" onClick={closeModal} />
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
                      id="relationship"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      formNoValidate
                      {...register("relationship", {
                        required: "Relationship is required!",
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
                    {errors.relationship && (
                      <p className="bioError">{errors.relationship.message}</p>
                    )}
                    <label htmlFor="relationship" className="form_label">
                      Relationship
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
                </div>
                <div className="NOKbtns">
                  <button className="btn" disabled>
                    Prev
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

export default EditNOKModal;

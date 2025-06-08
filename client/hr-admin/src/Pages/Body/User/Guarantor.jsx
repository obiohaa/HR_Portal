import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../../Context/userContext";
import { toast } from "react-toastify";
import { axiosFetch } from "../../../Utils/axiosFetch";
import PageLoading from "../../../Components/PageLoading";

const Guarantor = () => {
  const { userStepState } = useGlobalContext();
  // console.log(userStepState);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  //Using react query to handle the API call. API call for POSTING NOK
  const queryClient = useQueryClient();
  const { mutate: guarantorUser, isLoading } = useMutation({
    mutationFn: async (guarantorUser) => axiosFetch.post("/users/guarantorUser", guarantorUser),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
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
      guarantorUser(values);
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
    <div className="formsContainerBody">
      {userStepState && userStepState.completedStep >= 3 ? (
        <Modal />
      ) : (
        <form
          action=""
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate>
          <div className="formContainerGuarantor">
            <div className="formBioData">
              <input
                type="email"
                id="guarantorOneEmail"
                className="form_input"
                placeholder=""
                autoComplete="off"
                formNoValidate
                {...register("guarantorOneEmail", {
                  required: "Email address is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address!",
                  },
                })}
              />
              {errors.guarantorOneEmail && (
                <p className="bioError">{errors.guarantorOneEmail.message}</p>
              )}
              <label htmlFor="emailAddress" className="form_label">
                Guarantor One Email
              </label>
            </div>
            <div className="formBioData">
              <input
                type="email"
                id="guarantorTwoEmail"
                className="form_input"
                placeholder=" "
                autoComplete="off"
                formNoValidate
                {...register("guarantorTwoEmail", {
                  required: "Email address is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address!",
                  },
                })}
              />
              {errors.guarantorTwoEmail && (
                <p className="bioError">{errors.guarantorTwoEmail.message}</p>
              )}
              <label htmlFor="emailAddress" className="form_label">
                Guarantor Two Email
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
export default Guarantor;

import React from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetch } from "../../../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Loading from "../../Checks/Loading";
import { stateCapital } from "../../../Components/UserData";
import Select from "react-select";
import customStyles from "./CustomStyle";

const AddJob = () => {
  const { closeModal } = useGlobalContext();
  // const [showPassword, setShowPassword] = useState(false);
  // const [imgName, setImgName] = useState(null);
  // const [imgError, setImgError] = useState({ msg: "" });
  const qualifications = ["SSCE", "OND", "HND", "BSc", "MSc", "PhD", "MBA", "Other"];
  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevState) => !prevState);
  // };
  // console.log(userStepState);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({});

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: outletJobs, isLoading } = useMutation({
    mutationFn: async (outletJobs) => axiosFetch.post("/admins/outletJobs", outletJobs),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["outletJobs"] });
      reset();
      closeModal();
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
      outletJobs(values);
      // reset();
    } catch (error) {
      console.log(error);
      //To place an error so that it does not belong to any field we use root and not email or password or any field name
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  //   useEffect(() => {
  //     reset({
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       password: "",
  //     });
  //   }, [reset, user]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="infoModal-container">
      <div className="infoModal">
        <FaX className="cancelEdit" onClick={closeModal} />
        <div className="mainModal">
          <div className="modalContent">
            <div className="contentM">
              <div className="signupFrmEdit">
                <form
                  className="formEdit"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                  noValidate>
                  <div className="New_formContainerEdit">
                    <div className="formBioData">
                      <label htmlFor="OpenPosition" className="new_form_label">
                        Open Position
                      </label>
                      <input
                        type="text"
                        id="OpenPosition"
                        className="New_form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("OpenPosition", {
                          required: "Open Position is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 100,
                            message: "Maximum characters of 50 letters.",
                          },
                          pattern: {
                            value: /^[A-Za-z ,]+$/i,
                            message: "Only alphabets, spaces, and commas are allowed!",
                          },
                        })}
                      />
                      {errors.OpenPosition && (
                        <p className="bioErrorNewForm">{errors.OpenPosition.message}</p>
                      )}
                      {/* <label htmlFor="OpenPosition" className="form_label">
                        Open Position
                      </label> */}
                    </div>

                    <div className="formBioData">
                      <label htmlFor="OpenPosition" className="new_form_label">
                        Qualifications
                      </label>
                      <Controller
                        name="qualification"
                        control={control}
                        rules={{ required: "Qualification is required!" }}
                        render={({ field }) => {
                          const options = [
                            { value: "ALL", label: "All" },
                            ...qualifications.map((q) => ({ label: q, value: q })),
                          ];

                          const handleChange = (selected) => {
                            if (!selected) {
                              field.onChange([]);
                              return;
                            }

                            //  If "All" is picked → select every qualification
                            if (selected.some((s) => s.value === "ALL")) {
                              field.onChange(qualifications); // store all qualification values
                            } else {
                              field.onChange(selected.map((s) => s.value));
                            }
                          };

                          const value =
                            field.value?.length > 0
                              ? qualifications
                                  .filter((q) => field.value.includes(q))
                                  .map((q) => ({ label: q, value: q }))
                              : [];

                          return (
                            <Select
                              {...field}
                              isMulti
                              options={options}
                              onChange={handleChange}
                              value={value}
                              styles={customStyles}
                              classNamePrefix="react-select"
                              components={{
                                ClearIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }}
                              placeholder="Select qualification(s)"
                            />
                          );
                        }}
                      />
                      {errors.qualification && (
                        <p className="bioErrorNewForm">{errors.qualification.message}</p>
                      )}
                    </div>

                    <div className="formBioData">
                      <label htmlFor="OpenPosition" className="new_form_label">
                        State
                      </label>
                      <Controller
                        name="State"
                        control={control}
                        rules={{ required: "State is required!" }}
                        render={({ field }) => (
                          <Select
                            styles={customStyles}
                            {...field}
                            options={stateCapital.map((state) => ({
                              value: state.value,
                              label: state.state,
                            }))}
                            components={{
                              ClearIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }}
                            placeholder="Select a state"
                            onChange={(selected) => field.onChange(selected?.value)}
                            value={
                              field.value
                                ? {
                                    value: field.value,
                                    label:
                                      stateCapital.find((s) => s.value === field.value)?.state ||
                                      "",
                                  }
                                : null
                            }
                          />
                        )}
                      />
                      {errors.State && <p className="bioErrorNewForm">{errors.State.message}</p>}
                    </div>

                    <div className="formBioData">
                      <label htmlFor="JobDescription" className="new_form_label">
                        Job Description
                      </label>
                      <textarea
                        type="text"
                        id="JobDescription"
                        className=" textAreaInput"
                        placeholder=" "
                        autoComplete="off"
                        // rows={4}
                        // cols={50}
                        {...register("JobDescription", {
                          required: "Job Description is required!",
                          minLength: {
                            value: 2,
                            message: "Minimum characters of 2 letters.",
                          },
                          maxLength: {
                            value: 1000,
                            message: "Maximum characters of 1000 letters.",
                          },
                        })}
                      />
                      {errors.JobDescription && (
                        <p className="bioErrorTestArea">{errors.JobDescription.message}</p>
                      )}
                      {/* <label htmlFor="JobDescription" className="form_label">
                        Job Description
                      </label> */}
                    </div>
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="submitBtn jobBtn"
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

export default AddJob;

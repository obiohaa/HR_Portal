import React from "react";
import "../../component.css";
import PageLoading from "../../Checks/PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetch } from "../../../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { exportToExcel } from "../../../Utils/Excel/BioExportFunction";

const ExportBio = () => {
  const { closeExportModal } = useGlobalContext();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: exportDates, isLoading } = useMutation({
    mutationFn: async (exportDates) =>
      axiosFetch.post("/admins/getBioDataFromDateRange", exportDates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["registerAdmin"] });
      exportToExcel(data.data.AllBioData, "BIO DATA");
      //   exportToCSV(data.data.AllBioData, "BIO DATA");
      reset();
      closeExportModal();
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
      console.log(values);
      exportDates(values);
      // reset();
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
    <div className="infoModal-container">
      <div className="infoModal">
        <FaX className="cancelEdit" onClick={closeExportModal} />
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
                        type="date"
                        id="firstDate"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("firstDate", {
                          required: "From date is required!",
                          // validate: {
                          //   isFutureDate: (value) =>
                          //     new Date(value) < new Date() || "Date must be in the past",
                          // },
                        })}
                      />
                      {errors.firstDate && <p className="bioError">{errors.firstDate.message}</p>}
                      <label htmlFor="firstDate" className="form_label">
                        From Date
                      </label>
                    </div>
                    <div className="formBioData">
                      <input
                        type="date"
                        id="secondDate"
                        className="form_input"
                        placeholder=" "
                        autoComplete="off"
                        formNoValidate
                        {...register("secondDate", {
                          required: "To date is required!",
                          // validate: {
                          //   isFutureDate: (value) =>
                          //     new Date(value) < new Date() || "Date must be in the past",
                          // },
                        })}
                      />
                      {errors.secondDate && <p className="bioError">{errors.secondDate.message}</p>}
                      <label htmlFor="secondDate" className="form_label">
                        To Date
                      </label>
                    </div>
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

export default ExportBio;

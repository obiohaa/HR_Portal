import React from "react";
import "./user.css";
import logo from "/logo.svg";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useGlobalContext } from "../../../Context/userContext";
// import { toast } from "react-toastify";
// import { axiosFetch } from "../../../Utils/axiosFetch";
// import PageLoading from "../../../Components/PageLoading";

const GuarantorMainForm = () => {
  //   const {
  //     register,
  //     reset,
  //     formState: { errors },
  //     handleSubmit,
  //     setError,
  //   } = useForm();

  return (
    <div className="mainGuarantorContainer">
      <div className="mainGuarantorBody">
        <div className="mainGuarantorHeader">
          <div className="guarantorLogo">
            <img src={logo} alt="" className="guarantorFetLogo" />
          </div>
          <h3 className="mainGuarantorHead">Guarantor's Form</h3>
        </div>
        <div className="longLine"></div>
        <div className="mainGuarantorForm">
          <form
            action=""
            className="mainGuarantorFormContainer"
            encType="multipart/form-data"
            autoComplete="off"
            noValidate>
            <div className="mainGuarantorFormBody">
              <div className="mainGuarantorFormField">
                <input type="text" className="form_input" />
              </div>
              <div className="mainGuarantorFormField">
                <input type="text" className="form_input" />
              </div>
              <div className="mainGuarantorFormField">
                <input type="text" className="form_input" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuarantorMainForm;

import React, { useState, useEffect } from "react";
import "./component.css";
import PageLoading from "./PageLoading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData } from "../Utils/axiosFetch";
import { FaRegEyeSlash, FaRegEye, FaX } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const EditBioDataModal = ({ user }) => {
  const { closeModal, saveUser } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [imgError, setImgError] = useState({ msg: "" });
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  // console.log(userStepState);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({});

  //Using react query to handle the API call
  const queryClient = useQueryClient();
  const { mutate: updateUserProfile, isLoading } = useMutation({
    mutationFn: async (updateUserProfile) =>
      axiosFetchFormData.patch("/users/updateUser", updateUserProfile),
    onSuccess: (data) => {
      saveUser(data.data.user);
      reset();
      setImgName(null);
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["currentUser", "bioDataKey"] });
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
    try {
      if (imgName && imgName.size > 5000000) {
        setImgError({ msg: "Passport size must be less than 5MB" });
      } else {
        const formData = new FormData();
        formData.append("file", imgName);
        formData.append("body", JSON.stringify(values));
        console.log(formData);
        updateUserProfile(formData);
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
              <div className="signupFrmEdit">HELLO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBioDataModal;

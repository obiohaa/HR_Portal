import React from "react";
import { useGlobalContext } from "../../../../Context/userContext";
import ProfileModal from "../../../../Components/ProfileModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosFetchFormData, axiosFetch } from "../../../../Utils/axiosFetch";
import { toast } from "react-toastify";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import PageLoading from "../../../../Components/PageLoading";
import capitalizeFirstLetter from "../../../../Components/ToUpperCase";

const MyUser = () => {
  const { userStepState, user } = useGlobalContext();
  console.log(user);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  //Using react query to handle the API call. API call for POSTING NOK
  const queryClient = useQueryClient();
  const { mutate: updateMyUser, isLoading: loadingPost } = useMutation({
    mutationFn: async (nextOfKinUser) =>
      axiosFetchFormData.post("/users/nextOfKinData", nextOfKinUser),
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

  const { isLoading, data } = useQuery({
    // queryKey: ["products", currentPage], //updates when current page changes
    queryKey: ["registerUser"], //only update on one reload
    retryOnMount: false, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: false, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background

    queryFn: async () => {
      const { data } = await axiosFetch.get(`/users/getSingleUser?id=${user.userId}`);
      // setTotalPages(data.totalPages);

      return data;
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong while fetching user data", {
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
      updateMyUser(values);
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

  if (loadingPost) {
    return <PageLoading />;
  }

  return (
    <div className="bioDataProfileContainer">
      {!user ? (
        <ProfileModal />
      ) : (
        <div className="MyUserProfileBody">
          <div className="myUserProfileSection">
            <div className="myUserProfileImage">
              <img
                src="https://res.cloudinary.com/theplace-com-ng/image/upload/v1750007725/HR_ADMIN_PORTAL/tmp-1-1750007720064_kck4pv.jpg"
                alt=""
                className="profileImg"
              />
            </div>
            <div className="myUserProfileForm">
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
                      value={user ? `${capitalizeFirstLetter(user.firstName)}` : ""}
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
                      First Name
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
                      value={user ? `${capitalizeFirstLetter(user.lastName)}` : ""}
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
                      Last Name
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
                      value={user ? `${capitalizeFirstLetter(user.email)}` : ""}
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
                      Email
                    </label>
                  </div>
                  <div className="formBioData">
                    <input
                      type="password"
                      id="nextOfKinRelationship"
                      name="nextOfKinRelationship"
                      className="form_input"
                      placeholder=" "
                      autoComplete="off"
                      value={user ? `${capitalizeFirstLetter(user.userId)}` : ""}
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
                      Password
                    </label>
                  </div>
                </div>
                <div className="NOKbtns">
                  <button className="btn" disabled>
                    EDIT
                  </button>
                  <button type="submit" className="btn" disabled>
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyUser;

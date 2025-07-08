import React from "react";
import { createContext, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../Utils/axiosFetch";
// import { toast } from "react-toastify";
// import PageLoading from "../Components/PageLoading";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isBarOpen, setIsBarOpen] = useState(true);
  const [DropDownOpen, setDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userStepState, setUserStepState] = useState();

  const saveUser = (user) => {
    setUser(user);
  };

  // const removeUser = () => {
  //   setUser(null);
  // };

  const toggleNavbar = () => {
    setDropDownOpen(!DropDownOpen);
  };

  const openModal = () => {
    setIsDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDelModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const closeDelModal = () => {
    setIsDeleteModalOpen(false);
  };

  useQuery({
    queryKey: ["currentUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/showMe");
      saveUser(data.user);
      console.log(data.user);
      return data;
    },
    onError: () => {
      // console.log(error);
      // removeUser();
    },
  });

  return (
    <AppContext.Provider
      value={{
        user,
        saveUser,
        toggleNavbar,
        isBarOpen,
        setIsBarOpen,
        DropDownOpen,
        setUserStepState,
        userStepState,
        openModal,
        closeModal,
        isModalOpen,
        openDelModal,
        closeDelModal,
        isDeleteModalOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

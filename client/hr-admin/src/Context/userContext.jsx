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
  const [userStepState, setUserStepState] = useState();

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const toggleNavbar = () => {
    setDropDownOpen(!DropDownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/showMe");
      saveUser(data.user);
      return data;
    },
    onError: (error) => {
      console.log(error);
      removeUser();
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
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

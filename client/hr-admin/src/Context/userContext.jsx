import React from "react";
import { createContext, useState, useContext } from "react";

// import PageLoading from "../Components/PageLoading";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isBarOpen, setIsBarOpen] = useState(true);
  const [DropDownOpen, setDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
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

  const openViewModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openEditModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openExportModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(true);
  };

  const closeExportModal = () => {
    setIsExportModalOpen(false);
  };

  // if (error.response?.status === 401) {
  //   window.alert("Session expired. Please log in again.");
  //   window.location.href = "/login"; // or use navigate
  // }

  return (
    <AppContext.Provider
      value={{
        user,
        removeUser,
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
        isViewModalOpen,
        openViewModal,
        closeViewModal,
        openEditModal,
        closeEditModal,
        isEditModalOpen,
        isExportModalOpen,
        openExportModal,
        closeExportModal,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

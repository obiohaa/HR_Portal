import React from "react";
import { createContext, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "../Utils/axiosFetch";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isBarOpen, setIsBarOpen] = useState(true);
  const [DropDownOpen, setDropDownOpen] = useState(false);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const toggleNavbar = () => {
    setDropDownOpen(!DropDownOpen);
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
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

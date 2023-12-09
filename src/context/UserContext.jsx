import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );

  useEffect(() => {
   localStorage.setItem("user", JSON.stringify(user)); 
  },[user])

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({})
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  return (
    <UserContext.Provider value={{ user, setUser, getUser, logOutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

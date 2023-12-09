import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );

  const logOutUser = () => {
    setUser({});
    localStorage.removeItem("user");
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(user)); 
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  return (
    <UserContext.Provider value={{ user, getUser, logOutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

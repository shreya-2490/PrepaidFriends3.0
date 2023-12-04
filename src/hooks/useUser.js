import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useLocalStorage } from "./useLocalStorage";

const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser };
};

export { useUser };

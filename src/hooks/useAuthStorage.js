import AuthStorageContext from "../contexts/AuthStorageContext";
import { useContext } from "react";

const useAuthStorage = () => {
  const context = useContext(AuthStorageContext);

  if (context === undefined) {
    throw new Error(
      "useAuthStorage must be used within an AuthStorageContext provider"
    );
  }

  return context;
};

export default useAuthStorage;

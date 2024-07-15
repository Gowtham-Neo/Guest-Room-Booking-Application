import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user-customer");
    localStorage.removeItem("user-houseowner");

  }, []);

  return <Navigate to="/" />;
};

export default Logout;
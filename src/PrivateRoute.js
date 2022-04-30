import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("id_token");
  return auth ? (<Navigate to="/home"/> ) : ( <Navigate to="/login" /> );
};

export default PrivateRoute;
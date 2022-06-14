import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function Protected() {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth.accessToken) return <Outlet />;
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default Protected;

import { userStore } from "@/store/userStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoggin } = userStore();

  const isAuthenticated = isLoggin;
<<<<<<< HEAD
  
=======

>>>>>>> 34b7c5c4f8d5ec8c8ee784b833cf523e6cd16401
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

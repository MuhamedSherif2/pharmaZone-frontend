import { userStore } from "@/store/userStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { isLoggin } = userStore();

  if (isLoggin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;

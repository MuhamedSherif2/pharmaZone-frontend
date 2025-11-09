import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // TODO: Add authentication check logic
  const isAuthenticated = false; // This should check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;


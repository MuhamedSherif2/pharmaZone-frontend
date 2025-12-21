import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Verify from "./pages/auth/Verify";
import ResetPassword from "./pages/auth/reset-password";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Pharmacy from "./pages/pharmacy/category/pharmacy-category";
import CategorySlug from "./pages/pharmacy/category/categorySlug";
import ProductSlug from "./pages/pharmacy/product/productSlug";
import NavBar from "./components/NavBar";
import Cart from "./pages/pharmacy/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import { userStore } from "./store/userStore.js";

function App() {
  const { isLoggin } = userStore();
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" />
      {isLoggin && <NavBar />}
      <Routes>
        {/* Authentication Routes - accessible only if NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/cart" element={<Cart />} />

          {/* Pharmacy Routes */}
          <Route path="/pharmacy/category" element={<Pharmacy />} />
          <Route path="/pharmacy/category/:slug" element={<CategorySlug />} />
          <Route path="/pharmacy/product/:id" element={<ProductSlug />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Verify from "./pages/auth/Verify";
import Home from "./pages/Home";
import Pharmacy from "./pages/pharmacy/category/pharmacy-category";
import CategorySlug from "./pages/pharmacy/category/categorySlug";
import ProductSlug from "./pages/pharmacy/product/productSlug";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<Verify />} />

        {/* Protected Routes */}

        <Route path="/home" element={<Home />} />

        {/* Pharmacy Routes */}
        <Route path="/pharmacy/category" element={<Pharmacy />} />
        <Route path="/pharmacy/category/:slug" element={<CategorySlug />} />
        <Route path="/pharmacy/product/:id" element={<ProductSlug />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

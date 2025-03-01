import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import LoginPage from "./Components/login";
import HomePage from "./Components/home";
import RegisterPage from "./Components/register";
import ServicePage from "./Components/service";
import AboutUsPage from "./Components/aboutus";
import Admin from "./Components/Admin";
import AdminLogin from "./Components/admin_login";
import ProductPage from "./Components/products";
import SellerRegister from "./Components/Seller_register";
import SellersPage from "./Components/Sellers";
import SellerLoginForm from "./Components/Sellers_login";
import UsersPage from "./Components/Users";
import OrdersPage from "./Components/Orders";
import ForgotPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/SetNewPassword";
import UpdateServiceForm from "./Components/CreateProducts";
import SellerDashboard from "./Components/sellerDashboard";
import ManageProducts from "./Components/ManageProducts";
import SellerMessage from "./Components/SellersMessage";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen min-w-full">
      {/* You can add a navigation bar or any header here */}
      <header>
        {/* Optionally add a Navbar */}
      </header>

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        
        {/* Seller Routes */}
        <Route path="/seller_register" element={<SellerRegister />} />
        <Route path="/seller|login" element={<SellerLoginForm />} />
        <Route path="/sellers" element={<SellersPage />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/messages" element={<SellerMessage />} />


        <Route path="/seller/manage-products" element={<ManageProducts />} />


        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        
        {/* Product & Order Routes */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/create-product" element={<UpdateServiceForm />} />

        
        
        {/* User Management */}
        <Route path="/users" element={<UsersPage />} />


         {/*FORGET PASSWORD*/}
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />


      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import Login from "./components/auth/login/index";
import Signup from "./components/auth/signup/index";
import NotFound from "./components/miscellaneous/NotFound";

import Dashboard from "./components/admin/Dashboard/Dashboard";
import Contact from "./components/contact/index";
import AboutUs from "./components/AboutUs";
import Shop from "./components/shop/index";
import Collections from "./components/collections";
import SingleProduct from "./components/singleProduct";
import SingleCollection from "./components/singleCollection";
// Polices and Terms of Services Static Pages
import TermsOfService from "./components/miscellaneous/TermsOfService";
import PrivacyPolicy from "./components/miscellaneous/PrivacyPolicy";
import ShippingPolicy from "./components/miscellaneous/ShippingPolicy";
import ReturnAndRefund from "./components/miscellaneous/ReturnAndRefund";



// Admin Components Start
import Home from "./components/admin/Home/index";
import Category from "./components/admin/Category/index";
import SubCategory from "./components/admin/SubCategory/index";
import AdminProducts from "./components/admin/Products/index";
import CollectionsAdmin from "./components/admin/Collections/index";
import CommonCategoryPage from "./components/commonCategory/index";


// Admin Components End 


import Layout from "./components/layout";

const AllRoutes = () => {
  const UserProfile = JSON.parse(localStorage.getItem("Profile"));
  const UserRole = UserProfile?.role || "user"; // Default to 'user' if no role is found
  console.log("User Role:", UserRole);

  return (
    <Routes>
      {/* Standalone Routes (No Layout) */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Routes with Common Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/collection/:slug" element={<SingleCollection />} />
        {/* Polices and Terms of Services */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-and-refund-policies" element={<ReturnAndRefund />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/return-and-refund" element={<ReturnAndRefund />} />

        {/* Dynamic Route */}
        <Route path="/:common" element={<CommonCategoryPage />} />
      </Route>

      {/* Admin Routes */}

      {/* <Route path="/admin" element={<Dashboard />} /> */}
     { UserRole === 'admin' ? (
      <Route path="/admin" element={<Dashboard />}>
        {/* <Route path="home" element={<><h2>Admin Home</h2></>} />
        <Route path="category" element={<><h2>Admin Category</h2></>} />
        <Route path="sub-category" element={<><h2>Admin Sub Category</h2></>} />
        <Route path="products" element={<><h2>Admin Products</h2></>} /> */}
        <Route path="home" element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="sub-category" element={<SubCategory />} /> 
        <Route path="products" element={<AdminProducts />} /> 
        <Route path="collections-admin" element={<CollectionsAdmin />} /> 
      </Route>
        ) : (
        <Route path="/admin/login" element={<Login />} />
      )}

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;

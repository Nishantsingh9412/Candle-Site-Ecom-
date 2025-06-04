import React from "react";
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


// Admin Components Start
import Category from "./components/admin/Category/index";
import SubCategory from "./components/admin/SubCategory/index";
import AdminProducts from "./components/admin/Products/index";

// Admin Components End 


import Layout from "./components/layout";

const AllRoutes = () => {
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
      </Route>

      {/* Admin Routes */}

      {/* <Route path="/admin" element={<Dashboard />} /> */}

      <Route path="/admin" element={<Dashboard />}>
        {/* <Route path="home" element={<><h2>Admin Home</h2></>} />
        <Route path="category" element={<><h2>Admin Category</h2></>} />
        <Route path="sub-category" element={<><h2>Admin Sub Category</h2></>} />
        <Route path="products" element={<><h2>Admin Products</h2></>} /> */}
        <Route path="home" element={<><h2>Admin Home</h2></>} />
        <Route path="category" element={<Category />} />
        <Route path="sub-category" element={<SubCategory />} /> 
        <Route path="products" element={<AdminProducts />} /> 
        

      </Route>

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;

import React, { useState , useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


import LandingPage from "./components/landing/LandingPage";
import Login from "./components/auth/login/index";
import Signup from "./components/auth/signup/index";
import NotFound from "./components/miscellaneous/NotFound";

import Dashboard from "./components/admin/Dashboard/Dashboard";
import Contact from "./components/contact/index";
import Account from "./components/account";
import AboutUs from "./components/AboutUs";
import Shop from "./components/shop/index";
import Collections from "./components/collections";
import SingleProduct from "./components/singleProduct";
import SingleCollection from "./components/singleCollection";
import Checkout from "./components/checkout/Checkout";
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
  const UserRole = useSelector((state) => state.auth?.data?.role) || 'user' ;
  const UserAuthData = useSelector((state) => state.auth);  

  // const allStates = useSelector((state) => state);
  // console.log(allStates);

  console.log('User Auth Data:', UserAuthData);
  console.log('User Role:', UserRole);
  // const [UserRole, setUserRole] = useState('user');
  // const userProfile = JSON.parse(localStorage.getItem("Profile"));
  // const UserProfile = JSON.parse(localStorage.getItem("Profile"));
  // const UserRole = UserProfile?.role // Default to 'user' if no role is found
  // console.log("User Role:", UserRole);

  // useEffect(() => {
  //   // Update UserRole whenever UserProfile changes
  //   if (userProfile && userProfile.role) {
  //     setUserRole(userProfile.role);
  //   } else {
  //     setUserRole('user');  // Default to 'user' if no role is found
  //   }
  // }, [userProfile]);

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
        <Route path="/account/:userId" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />

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

      {UserRole === 'admin' && (
        <Route path="/admin" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} /> 
          <Route path="products" element={<AdminProducts />} /> 
          <Route path="collections-admin" element={<CollectionsAdmin />} /> 
        </Route>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;

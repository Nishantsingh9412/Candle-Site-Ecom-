import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
} from "lucide-react";

const Account = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  // const user = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   joined: "January 2023",
  // };

  const user = JSON.parse(localStorage.getItem("Profile"));

  const calculateUserJoined = (date) => {
    const joinedDate = new Date(date);
    const options = { year: "numeric", month: "long" };
    return joinedDate.toLocaleDateString(undefined, options);
  };

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Handle URL query parameters for tab selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const localStorageTempToken =
        user?.token || localStorage.getItem("Profile")?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorageTempToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }

      console.log("Orders fetched successfully:", data.orders); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user.fname}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button className="mt-1 text-indigo-600 hover:text-indigo-800">
                  Change Password
                </button>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {loadingOrders ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Order #{order._id.slice(-8)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                        <p className="font-bold text-lg mt-1">
                          ₹{order.totalPrice}
                            {/* ₹{order.totalPrice.toFixed(2)} */}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.orderItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <img
                              // src={item.productImage || "/placeholder.jpg"}
                              src={item?.productImage ? `${import.meta.env.VITE_API_URL}/uploads/${item?.productImage}` : "https://placehold.co/64X64?text=No+Image"}
                              // src={
                              //   item?.product?.images?.[0]
                              //     ? `${import.meta.env.VITE_API_URL}/uploads/${
                              //         item?.product?.images[0]
                              //       }`
                              //     : "https://placehold.co/64X64?text=No+Image"
                              // }
                              alt={item?.productName}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-gray-600 text-sm">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium mb-1">Shipping Address:</h4>
                      <p className="text-gray-600 text-sm">
                        {order.shippingAddress.fullName}
                        <br />
                        {order.shippingAddress.address}
                        <br />
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                        <br />
                        Phone: {order.shippingAddress.phone}
                      </p>
                    </div>

                    {order.paymentInfo && (
                      <div className="mb-3">
                        <h4 className="font-medium mb-1">Payment Status:</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.paymentInfo.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : order.paymentInfo.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentInfo.status === "paid"
                            ? "Paid"
                            : order.paymentInfo.status === "failed"
                            ? "Failed"
                            : "Pending"}
                        </span>
                        {order.paymentInfo.paidAt && (
                          <p className="text-gray-600 text-sm mt-1">
                            Paid on:{" "}
                            {new Date(
                              order.paymentInfo.paidAt
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Items: ₹{order.itemsPrice}</span>
                      <span>Tax: ₹{order.taxPrice}</span>
                      <span>Shipping: ₹{order.shippingPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                You haven't placed any orders yet.
              </p>
            )}
          </div>
        );
      case "wishlist":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            <p className="text-gray-500">Your wishlist is empty.</p>
          </div>
        );
      case "addresses":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            <p className="text-gray-500">No addresses added yet.</p>
          </div>
        );
      case "payments":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payments</h2>
            <p className="text-gray-500">No payment methods added yet.</p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-500">Settings content goes here.</p>
          </div>
        );
      case "logout":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Logged Out</h2>
            <p className="text-gray-500">You have been logged out.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold">Hi, {user.fname}!</h1>
        <p className="mt-1">
          Member since {calculateUserJoined(user.createdAt)} | {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "profile"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="mr-3" /> Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "orders"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ShoppingBag className="mr-3" /> Orders
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "wishlist"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className="mr-3" /> Wishlist
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "addresses"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="mr-3" /> Addresses
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "payments"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <CreditCard className="mr-3" /> Payments
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === "settings"
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Settings className="mr-3" /> Settings
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-3">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Account;

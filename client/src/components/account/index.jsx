import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings
} from "lucide-react";

const Account = () => {
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

  const orders = [
    {
      id: "#12345",
      date: "2023-05-15",
      status: "Delivered",
      total: "$45.99",
    },
    {
      id: "#12346",
      date: "2023-06-20",
      status: "Processing",
      total: "$32.50",
    },
  ];

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
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

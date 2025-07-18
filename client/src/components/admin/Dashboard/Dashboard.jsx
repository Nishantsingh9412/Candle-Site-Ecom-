import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import { Home, User, Settings, LogOut, ShoppingBasket, Boxes } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("Profile");
    if (!profile) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 bg-gray-900">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <ul className="flex-1 space-y-4 p-4">
          <Link to="/admin/home">
            <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <Home />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/admin/category">
            <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <User />
              <span>Category</span>
            </li>
          </Link>
          <Link to="/admin/sub-category">
            <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <Settings />
              <span>Sub Category</span>
            </li>
          </Link>
          <Link to="/admin/products">
            <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <ShoppingBasket />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/collections-admin">
            <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
              <Boxes />
              <span>Collections</span>
            </li>
          </Link>
          <li
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded cursor-pointer"
          >
            <LogOut />
            <span>Logout</span>
          </li>
        </ul>
        <footer className="p-4 bg-gray-900 text-center text-sm">
          &copy; Copyright {new Date().getFullYear()}
          &nbsp; Scented Gleam{" "}
        </footer>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

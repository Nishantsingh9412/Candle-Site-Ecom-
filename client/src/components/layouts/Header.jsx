import React, { useEffect, useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategoriesAction } from "../../redux/action/category";
import { GetAllSubCategoriesAction } from "../../redux/action/subCategory";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);


  const categories = useSelector((state) => state.category);
  console.log(categories);
  // Dynamic navigation items based on categories

  const subCategories = useSelector((state) => state.subCategory);
  console.log(subCategories);

  const DynamicNavItems = categories?.categories?.map((category) => ({
    name: category.CategoryName.toUpperCase(),
    path: category.CategoryName,
    // path: category.CategoryName === "All" ? "/all" : `/category/${category._id}`,
  }))
  // .concat(subCategories?.subCategories?.map((subCategory) => ({
  //   name: subCategory.SubCategoryName,
  //   path: `/subcategory/${subCategory._id}`,
  // }))
// );


  useEffect(() => {
    dispatch(GetAllCategoriesAction());
    dispatch(GetAllSubCategoriesAction());
  }, []);

  const navItems = [
    { name: "ABOUT US", path: "/about-us" },
    ...DynamicNavItems,
    // { name: 'SHOP', path: '/shop' },
    // { name: 'COLLECTIONS', path: '/collections' },
    // { name: "SALE", path: "/sale" },
    // { name: "BESPOKE", path: "/bespoke" },
    // { name: "STOCKISTS", path: "/stockists" },
    { name: "CONTACT US", path: "/contact-us" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conditional rendering based on search state */}
        {isSearchOpen ? (
          /* Search Mode - Only Search Bar */
          <div className="py-4">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                autoFocus
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          /* Normal Mode - Logo and Icons */
          <>
            <div className="flex justify-between items-center py-4 lg:py-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="text-2xl lg:text-3xl font-serif italic text-gray-800">
                Niana
                </div>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-4">
                {/* Search Icon */}
                <button
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} />
                </button>

                {/* User Icon */}
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <User size={20} />
                </button>

                {/* Shopping Bag with Badge */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Navigation - Always Visible in Normal Mode */}
            <div className="border-t border-gray-200 py-3">
              <nav className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
                {navItems.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 tracking-wide whitespace-nowrap cursor-pointer"
                  >
                    {item.name}
                  </p>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

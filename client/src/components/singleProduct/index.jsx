import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AlsoLike from "./components/AlsoLike";
import { getProductBySlugAction } from "../../redux/action/product";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const {slug} = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const slugProductData = useSelector((state) => state.product?.slugProduct || {});
  console.log(slugProductData);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  useEffect(() => {
    dispatch(getProductBySlugAction(slug));
  }, [dispatch, slug]);

  if (!slugProductData._id) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  }

  const renderTabContent = (section) => {
    switch (section) {
      case 'description':
        return slugProductData.description;
      case 'customer reviews':
        return slugProductData.Reviews?.length > 0 
          ? slugProductData.Reviews.map((review, index) => (
              <div key={index} className="mb-2">{review}</div>
            ))
          : "No reviews yet.";
      case 'shipping':
        return slugProductData.shippingDescription;
      case 'instructions':
        return slugProductData.instructions;
      case 'additional information':
        return slugProductData.additionalInfo;
      default:
        return `Content for ${section} section goes here...`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <span>Home</span> <span className="mx-2"> </span>{" "}
        <span>{slugProductData.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={slugProductData.images?.[0]?.url || "https://via.placeholder.com/480x634?text=No+Image"}
            alt={slugProductData.name}
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-light text-gray-900">
            {slugProductData.name}
          </h1>

          <div className="flex items-center space-x-2">
            <span className="text-3xl font-semibold text-gray-900">
              Rs. {slugProductData.price}
            </span>
            {slugProductData.comparePrice && (
              <span className="text-lg text-gray-500 line-through">
                Rs. {slugProductData.comparePrice}
              </span>
            )}
            <span className="text-sm text-gray-600">
              (Inclusive of all taxes)
            </span>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 w-32">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={slugProductData.minOrderQuantity || 1}
                max={slugProductData.maxOrderQuantity || 100}
                onChange={(e) =>
                  setQuantity(Math.max(slugProductData.minOrderQuantity || 1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center py-2 border-none outline-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-gray-800 text-white py-3 px-6 text-lg font-medium hover:bg-gray-900 transition-colors">
            ADD TO CART
          </button>

          {/* Product Information Sections */}
          <div className="space-y-4 mt-8">
            {[
              "DESCRIPTION",
              "CUSTOMER REVIEWS",
              "SHIPPING",
              "INSTRUCTIONS",
              "ADDITIONAL INFORMATION",
            ].map((section) => (
              <div key={section} className="border-b border-gray-200">
                <button
                  onClick={() => setActiveTab(section.toLowerCase())}
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 hover:text-gray-700"
                >
                  {section}
                  <span className="text-2xl">
                    {activeTab === section.toLowerCase() ? "−" : "+"}
                  </span>
                </button>
                {activeTab === section.toLowerCase() && (
                  <div className="pb-4 text-gray-600">
                    <p>
                      {renderTabContent(section.toLowerCase())}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Also Like Section */}
      <AlsoLike />
    </div>
  );
};

export default SingleProduct;

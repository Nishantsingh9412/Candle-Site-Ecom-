import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AlsoLike from "./components/AlsoLike";
import { getProductBySlugAction } from "../../redux/action/product";
import AddToCartButton from "../cart/AddToCartButton";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const slugProductData = useSelector(
    (state) => state.product?.slugProduct || {}
  );
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
      case "description":
        return slugProductData.description;
      case "customer reviews":
        return slugProductData.Reviews?.length > 0
          ? slugProductData.Reviews.map((review, index) => (
              <div key={index} className="mb-2">
                {review}
              </div>
            ))
          : "No reviews yet.";
      case "shipping":
        return slugProductData.shippingDescription;
      case "instructions":
        return slugProductData.instructions;
      case "additional information":
        return slugProductData.additionalInfo;
      default:
        return `Content for ${section} section goes here...`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <span>Home</span> <span className="mx-2">/</span>
        <span>{slugProductData.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="flex justify-center">
            <img
              id="mainImage"
              src={
                slugProductData.images?.[0]
                  ? `${import.meta.env.VITE_API_URL}/uploads/${slugProductData.images[0]}`
                  : "https://placehold.co/530x700?text=No+Image+Available"
              }
              alt={slugProductData.name}
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>

          {/* Thumbnail Images */}
          {slugProductData.images && slugProductData.images.length > 1 && (
            <div className="flex justify-center space-x-2 overflow-x-auto">
              {slugProductData.images.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_API_URL}/uploads/${image}`}
                  alt={`${slugProductData.name} ${index + 1}`}
                  className="w-16 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-gray-300 transition-colors"
                  onClick={() => {
                    const mainImg = document.getElementById('mainImage');
                    mainImg.src = `${import.meta.env.VITE_API_URL}/uploads/${image}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-light text-gray-900">
            {slugProductData.name}
          </h1>
          
          {slugProductData.brand && (
            <p className="text-lg text-gray-600">
              Brand: <span className="font-medium">{slugProductData.brand}</span>
            </p>
          )}

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

          {/* Product Highlights */}
          {slugProductData.productHighlights && slugProductData.productHighlights.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Product Highlights:</h3>
              <ul className="list-disc list-inside space-y-1">
                {slugProductData.productHighlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Properties */}
          {(slugProductData.color || slugProductData.size || slugProductData.material) && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-gray-200">
              {slugProductData.color && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Color:</span>
                  <p className="text-gray-900">{slugProductData.color}</p>
                </div>
              )}
              {slugProductData.size && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Size:</span>
                  <p className="text-gray-900">{slugProductData.size}</p>
                </div>
              )}
              {slugProductData.material && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Material:</span>
                  <p className="text-gray-900">{slugProductData.material}</p>
                </div>
              )}
            </div>
          )}

          {/* Availability Status */}
          {slugProductData.availability && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Availability:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                slugProductData.availability === 'in_stock' 
                  ? 'bg-green-100 text-green-800' 
                  : slugProductData.availability === 'out_of_stock'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {slugProductData.availability.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity 
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
                  setQuantity(
                    Math.max(
                      slugProductData.minOrderQuantity || 1,
                      parseInt(e.target.value) || 1
                    )
                  )
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
          <AddToCartButton 
            product={slugProductData}
            quantity={quantity}
            showQuantitySelector={false}
            variant="primary"
            size="large"
            className="w-full"
          />

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
                    <p>{renderTabContent(section.toLowerCase())}</p>
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

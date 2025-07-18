import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getCollectionBySlugAction } from "../../redux/action/collections";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [sortBy, setSortBy] = useState("Featured");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  console.log("slug", slug);
  console.log("params", useParams());
  // Here you can use the slug to fetch the collection data if needed

  useEffect(() => {
    dispatch(getCollectionBySlugAction(slug));
  }, [dispatch]);

  console.log(
    "collection",
    useSelector((state) => state.collections.selectedCollection)
  );
  const collection = useSelector(
    (state) => state.collections.selectedCollection
  );

  const products =
    useSelector((state) => state.collections.selectedCollection?.products) ||
    [];

  console.log("products", products);

  // Filter and sort products based on current sortBy state
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = [...products];
    
    // Apply sorting
    switch (sortBy) {
      case "Price, low to high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price, high to low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetically, A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // Featured
        break;
    }
    
    return filtered;
  }, [products, sortBy]);

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Add to cart handler
  const handleAddToCart = (productId) => {
    console.log("Adding product to cart:", productId);
    // Implement your add to cart logic here
  };

  if (!products || products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-wider text-gray-900 mb-4">
              No Products Available
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-64 object-cover rounded-sm mb-8"
        />
        <h1 className="text-3xl font-medium text-center tracking-wider text-gray-700 mb-4">
          {collection.title}
        </h1>

        <p className="text-sm text-gray-600 text-center leading-relaxed mb-8">
          {collection.description}
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-stone-100 sticky top-8">
              {/* Sort Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-stone-200 rounded-md px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent bg-white"
                >
                  <option>Featured</option>
                  <option>Price, low to high</option>
                  <option>Price, high to low</option>
                  <option>Alphabetically, A-Z</option>
                </select>
              </div>

              {/* Collections Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                  Collections
                </h3>
              </div>

              {/* Product Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                  Product Type
                </h3>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Counter */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-200">
              <p className="text-stone-600 text-sm">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6 opacity-50">🕯️</div>
                <p className="text-stone-500 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.slug}`)}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={
                            product.images?.[0]
                              ? `${import.meta.env.VITE_API_URL}/uploads/${product.images[0]}`
                              : "https://placehold.co/530x700?text=No+Image+Available"
                          }
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Sale Badge */}
                        {product.comparePrice && product.comparePrice > product.price && (
                          <div className="absolute top-4 left-4 bg-stone-800 text-white px-3 py-1 text-xs font-medium rounded">
                            {Math.round(100 - (product.price / product.comparePrice) * 100)}% Off
                          </div>
                        )}
                        {/* Add to Cart Button */}
                        {hoveredProduct === product._id && (
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product._id);
                              }}
                              className="w-full bg-stone-800 text-white py-3 px-4 rounded-md hover:bg-stone-900 transition-colors duration-300 font-medium text-sm"
                            >
                              Add to Cart
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-stone-800 font-medium mb-2 group-hover:text-stone-600 transition-colors">
                          {product.name}
                        </h3>
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          {product.comparePrice && product.comparePrice > product.price ? (
                            <>
                              <span className="text-stone-400 line-through text-sm">
                                ₹{product.comparePrice}
                              </span>
                              <span className="text-stone-800 font-medium">
                                ₹{product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-stone-800 font-medium">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                        {/* Reviews */}
                        {product.Reviews && product.Reviews.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(5)} {/* Default to 5 stars since no rating in data */}
                            </div>
                            <span className="text-stone-500 text-xs">
                              ({product.Reviews.length})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default index;

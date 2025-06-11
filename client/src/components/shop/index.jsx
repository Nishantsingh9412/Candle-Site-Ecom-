import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllProductsAction } from "../../redux/action/product";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("Featured");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);

  // Fetch products from Redux store
  const { products } = useSelector(
    (state) => state.product || { products: [] }
  );

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  // Extract unique collections and product types from products
  const collections = useMemo(() => {
    const set = new Set(
      products.map((p) => p.category?.CategoryName || p.category || "")
    );
    return Array.from(set).filter(Boolean);
  }, [products]);

  const productTypes = useMemo(() => {
    const set = new Set(products.map((p) => p.type || "Scented Soy Candles"));
    return Array.from(set).filter(Boolean);
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryName = product.category?.CategoryName || product.category;
      const typeName = product.type || "Scented Soy Candles";
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(categoryName);
      const typeMatch =
        selectedProductTypes.length === 0 ||
        selectedProductTypes.includes(typeName);
      return categoryMatch && typeMatch;
    });

    switch (sortBy) {
      case "Price, low to high":
        return filtered.slice().sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return filtered.slice().sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, selectedCategories, selectedProductTypes, sortBy]);

  const handleCategoryFilter = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProductTypeFilter = (type) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Implement cart functionality
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-200"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <div className="min-h-screen bg-stone-50 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-4 tracking-wide">
              Our Collection
            </h1>
            <div className="w-24 h-px bg-stone-300 mx-auto mb-6"></div>
            <p className="text-stone-600 text-lg font-light max-w-2xl mx-auto">
              Handcrafted with love, our candles bring warmth and tranquility to
              your space
            </p>
          </div>

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
                  <div className="space-y-3">
                    {collections.map((collection, idx) => (
                      <label
                        key={idx}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(collection)}
                          onChange={() => handleCategoryFilter(collection)}
                          className="w-4 h-4 text-stone-600 border-stone-300 rounded focus:ring-stone-500 focus:ring-2"
                        />
                        <span className="ml-3 text-stone-700 text-sm group-hover:text-stone-900 transition-colors">
                          {collection}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Product Type Filter */}
                <div>
                  <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                    Product Type
                  </h3>
                  <div className="space-y-3">
                    {productTypes.map((type, idx) => (
                      <label
                        key={idx}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(type)}
                          onChange={() => handleProductTypeFilter(type)}
                          className="w-4 h-4 text-stone-600 border-stone-300 rounded focus:ring-stone-500 focus:ring-2"
                        />
                        <span className="ml-3 text-stone-700 text-sm group-hover:text-stone-900 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Results Counter */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-200">
                <p className="text-stone-600 text-sm">
                  Showing {filteredAndSortedProducts.length} of{" "}
                  {products.length} products
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
                      key={product._id || product.id}
                      className="group cursor-pointer"
                      // onClick={() => console.log(`Clicked on product ${product._id || product.id}`)}
                      onClick={() => navigate(`/product/${product.slug}`)}
                      onMouseEnter={() =>
                        setHoveredProduct(product._id || product.id)
                      }
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            // src={product.images?.[0] || "https://placehold.co/530x700"}
                            src={
                              product.images?.[0]
                                ? `${import.meta.env.VITE_API_URL}/uploads/${
                                    product.images[0]
                                  }`
                                : "https://placehold.co/530x700?text=No+Image+Available"
                            }
                            // src="https://placehold.co/530X700?text=No+Image+Available"
                            alt={product.name}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Sale Badge */}
                          {product.comparePrice &&
                            product.comparePrice > product.price && (
                              <div className="absolute top-4 left-4 bg-stone-800 text-white px-3 py-1 text-xs font-medium rounded">
                                {Math.round(
                                  100 -
                                    (product.price / product.comparePrice) * 100
                                )}
                                % Off
                              </div>
                            )}
                          {/* Sold Out Overlay */}
                          {product.soldOut && (
                            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                              <span className="text-stone-500 font-medium text-lg">
                                Sold Out
                              </span>
                            </div>
                          )}
                          {/* Add to Cart Button */}
                          {!product.soldOut &&
                            hoveredProduct === (product._id || product.id) && (
                              <div className="absolute inset-x-0 bottom-0 p-4">
                                <button
                                  onClick={() =>
                                    handleAddToCart(product._id || product.id)
                                  }
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
                            {product.comparePrice &&
                            product.comparePrice > product.price ? (
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
                          {product.rating && (
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-stone-500 text-xs">
                                ({product.reviews || 0})
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
      </div>
    </>
  );
};

export default Shop;

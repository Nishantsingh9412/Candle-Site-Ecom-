import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllCollectionsAction } from "../../redux/action/collections";

const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collections = useSelector((state) => state.collections.collections);
  console.log("Collections:", collections);

  useEffect(() => {
    dispatch(getAllCollectionsAction());
  }, [dispatch]);

  if (!collections || collections.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-wider text-gray-900 mb-4">
              No Collections Available
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              We're currently updating our collections. Please check back soon for our latest curated selections.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {collections.length > 0 &&
            collections.map((collection) => (
              <div key={collection.id} className="text-center group">
                <div className="mb-8">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-48 sm:h-56 object-cover rounded-sm"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-light tracking-wider text-gray-900">
                    {collection.title}
                  </h2>
                  <p className="text-xs text-gray-400 font-light tracking-wide">
                    {collection.products.length} PRODUCTS
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {collection.description.slice(0, 100)}...
                    {/* {collection.description.length > 100 ? " Read more" : ""} */}
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/collection/${collection.slug}`);
                    }}
                    className="mt-6 px-8 py-3 text-xs tracking-widest font-medium text-white bg-black border-2 border-black 
                                 hover:bg-white hover:text-black hover:shadow-lg 
                                 transform hover:scale-105 transition-all duration-300 ease-in-out
                                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Collections;

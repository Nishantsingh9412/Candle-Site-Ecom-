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

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {collections.map((collection) => (
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

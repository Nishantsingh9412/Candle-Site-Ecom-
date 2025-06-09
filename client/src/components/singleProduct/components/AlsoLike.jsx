import React from 'react'

const AlsoLike = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample Product Cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="b order rounded-lg overflow-hidden shadow">
            <img
            //   src={`https://niana.co/cdn/shop/products/Thumbnail${index+1}_1024x1024.jpg?v=1704191050`}
              src='https://niana.co/cdn/shop/products/Thumbnail1_d2aa994a-b044-4af3-bad5-06a35def547c_1024x1024.jpg?v=1704191050'
              alt={`Product ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">Product {index + 1}</h3>
              <p className="text-gray-600">Rs. {700 + index * 100}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlsoLike

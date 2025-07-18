import React from 'react'

const TopProducts = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-8">Luxury Home Fragrances</h2>
            <div className="grid grid-cols-2 gap-6 max-w-full mx-auto p-14">
                {/* Row 1 */}
                <div className="col-span-1 m-4 relative group">
                    <img 
                        src="https://niana.co/cdn/shop/files/Poofume_resized_600x_crop_center.jpg?v=1695102561" 
                        alt="Product 1" 
                        className="w-full h-auto"
                    />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100">
                        Shop Now
                    </button>
                </div>
                <div className="col-span-1 m-4 relative group">
                    <img 
                        src="https://niana.co/cdn/shop/files/Scented_Candles_49c70531-fdfd-495c-951b-f3914501d08d_600x_crop_center.jpg?v=1614300163" 
                        alt="Product 2" 
                        className="w-full h-auto"
                    />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100">
                        Shop Now
                    </button>
                </div>
                
                {/* Row 2 */}
                <div className="col-span-1 m-4 relative group">
                    <img 
                        src="https://niana.co/cdn/shop/files/Scented_Sachets_6d68d929-2c19-4b5a-8f28-c22c7b85ca33_600x_crop_center.jpg?v=1614300163" 
                        alt="Product 3" 
                        className="w-full h-auto"
                    />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100">
                        Shop Now
                    </button>
                </div>
                <div className="col-span-1 m-4 relative group">
                    <img 
                        src="https://niana.co/cdn/shop/files/Reed_Diffusers_d54e3cde-beb5-4b8b-9f43-e19b3a0bc45b_600x_crop_center.jpg?v=1614300163" 
                        alt="Product 4" 
                        className="w-full h-auto"
                    />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopProducts

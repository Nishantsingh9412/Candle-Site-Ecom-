import React from "react";

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "SIGNATURE RANGE",
      productCount: 42,
      description:
        "A luxurious range of soy candles, reed diffusers and sachets in our signature blue floral packaging.",
      image:
        "https://niana.co/cdn/shop/files/4-4_600x_crop_center.jpg?v=1614300602",
    },
    {
      id: 2,
      title: "THE SCENTED GARDEN",
      productCount: 85,
      description:
        "Evoke the tranquillity of a sun-drenched garden with Niana's floral fragrances. Fill your home with the aroma of fresh cut flowers.",
      image:
        "https://niana.co/cdn/shop/files/6-1_600x_crop_center.jpg?v=1614300602",
    },
    {
      id: 3,
      title: "TIMELESS",
      productCount: 10,
      description:
        "Embark on an aromatic journey with Passion, Quest and Zeal. Set in fine bone china, these handcrafted luxurious candles will transform your space.",
      image:
        "https://niana.co/cdn/shop/files/7-2_600x_crop_center.jpg?v=1614300602",
    },
    {
      id: 4,
      title: "SEASONAL COLLECTION",
      productCount: 24,
      description:
        "Limited edition seasonal fragrances that capture the essence of each time of year with carefully curated scent profiles.",
      image:
        "https://niana.co/cdn/shop/files/5.1-1_600x_crop_center.jpg?v=1614300602",
    },
    {
      id: 5,
      title: "WELLNESS RETREAT",
      productCount: 18,
      description:
        "Therapeutic aromatherapy candles designed to promote relaxation, focus, and well-being through natural essential oils.",
      image: "https://placehold.co/390x300",
    },
    {
      id: 6,
      title: "LUXURY EDITION",
      productCount: 6,
      description:
        "Our most premium collection featuring rare ingredients and hand-blown glass vessels for the ultimate sensory experience.",
      image: "https://placehold.co/385x300",
    },
  ];

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
                  {collection.productCount} PRODUCTS
                </p>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {collection.description}
                </p>
                <button className="mt-6 text-xs tracking-widest text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors duration-300">
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

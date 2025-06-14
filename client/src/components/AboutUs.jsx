import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-serif text-gray-800 mb-4">OUR STORY</h1>
        <div className="w-24 h-px bg-gray-400 mx-auto"></div>
      </div>

      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://niana.co/cdn/shop/files/AU_5_800x800.jpg?v=1614301262" 
              alt="Candles and products" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-serif text-gray-800 mb-6">ABOUT US</h2>
            <p className="text-gray-600 leading-relaxed">
              Scented Gleam is a luxury home fragrance brand specialising in eco-friendly 
              soy candles, reed diffusers, room sprays and sachets. Each luxuriously 
              textured product is finely finished by hand. Known for its unique 
              fragrance portfolio, Scented Gleam sources top quality, evocative and eclectic.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">MISSION</h2>
              <p className="text-gray-600 leading-relaxed">
                Scented Gleam seeks to modern your senses, to bring to your life and home, a 
                deep sense of joy, serenity and illumination. We believe that fragrance 
                has the ability to transform a space, alter a mood and rekindle 
                memories. With a conscious commitment to our planet, Scented Gleam uses 
                natural soy wax and cotton wicks for its candles, and sources the finest 
                ingredients globally.
              </p>
            </div>
            <div>
              <img 
                src="https://niana.co/cdn/shop/files/AU_9_800x800.jpg?v=1614301262" 
                alt="Product showcase" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://niana.co/cdn/shop/files/AU_2_800x800.jpg?v=1614301262" 
                alt="Innovation products" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-serif text-gray-800 mb-6">INNOVATION</h2>
              <p className="text-gray-600 leading-relaxed">
                Working closely with companies that are pioneers in the highly 
                specialised field of fragrance gives us exposure to the latest trends 
                permeating around the world. We do extensive research and 
                consistently train ourselves to remain fresh, creative and innovative. 
                Keeping customer insights and preferences in mind, we bring to you 
                unique fragrances that reflect deep reflection and complexity in their 
                formulation. Our modern presentation lines reflect world class 
                standards in design, quality and delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Founders Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">OUR FOUNDERS</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed">
                Immense desire to work with her hands, Scented Gleam was founded by Leena 
                Laharia in 2011. Born in her kitchen, Scented Gleam became one of the most 
                bourgeoning luxury candle brands in India. Started after her two 
                daughters, Nishara & Aruneka, Scented Gleam is an expression of her purest 
                love. Nishara joined Scented Gleam in 2014 and expanded the product range 
                to include other luxury home fragrance products catering to 
                individual, corporate and institutional buyers.
              </p>
            </div>
            <div>
              <img 
                src="https://niana.co/cdn/shop/files/N_L-1_800x800.jpg?v=1614301172" 
                alt="Founders" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

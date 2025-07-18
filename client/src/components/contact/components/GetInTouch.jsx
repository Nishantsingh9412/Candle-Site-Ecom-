import { useState } from "react";
import {
  MessageSquare,
  Instagram,
  Facebook,
  MapPin,
  Mail,
  Clock,
  Send,
} from "lucide-react";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here

    // Reset form after submission
    setFormData({ name: "", phone: "", email: "", comment: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {/* Form Section */}
          <div className="flex-1 min-w-[300px]">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Send className="mr-3 text-blue-500" size={24} />
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder="Tell us how we can help you..."
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="flex-1 min-w-[300px]">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold mb-8">
                Contact Information
              </h3>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Address</h4>
                    <p className="text-gray-300 leading-relaxed">
                      60, Rathod Nagar, Vaishali Nagar, Jaipur, ,
                      <br />
                      Rajasthan 302021 , India
                    </p>
                    <p className="text-gray-300 mt-2">
                      <strong>Phone:</strong> +91-9503527136
                    </p>
                    <div className="flex items-center mt-2 text-gray-300">
                      <Clock className="mr-2" size={14} />
                      Monday to Friday, 10 AM to 6 PM
                    </div>

                    <button className="mt-4 border-2 border-blue-400 bg-transparent text-blue-400 py-2 px-6 rounded-lg transition-all duration-300 hover:bg-blue-400 hover:text-white transform hover:scale-105">
                      Get Directions
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Email Us</h4>
                    <p className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                      scentedgleam@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">WhatsApp</h4>
                    <p className="text-green-300 hover:text-green-200 transition-colors cursor-pointer">
                      +91-9503527136
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {/* <a
                      href="#"
                      aria-label="WhatsApp"
                      className="bg-green-500 p-3 rounded-full transition-all duration-300 hover:bg-green-600 hover:scale-110"
                    >
                      <MessageSquare size={20} />
                    </a> */}
                    <a
                      href="https://www.instagram.com/scentedgleam?utm_source=qr&igsh=MXM1ZmM2dnBycjVxYQ=="
                      aria-label="Instagram"
                      className="bg-pink-500 p-3 rounded-full transition-all duration-300 hover:bg-pink-600 hover:scale-110"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61565428497592&mibextid=JRoKGi"
                      aria-label="Facebook"
                      className="bg-blue-600 p-3 rounded-full transition-all duration-300 hover:bg-blue-700 hover:scale-110"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

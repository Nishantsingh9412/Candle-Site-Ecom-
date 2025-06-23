import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  // Dynamic footer data
  const footerSections = [
    {
      title: "SHOP",
      links: [
        { name: "All", path: "/all" },
        { name: "Soy Candles", path: "/soy-candles" },
        { name: "Reed Diffusers", path: "/reed-diffusers" },
        { name: "sachets", path: "/sachets" },
        { name: "poofume", path: "/poofume" },
      ],
    },
    {
      title: "EXPLORE",
      links: [
        { name: "Signature Range", path: "/signature-range" },
        { name: "Spring Summer", path: "/spring-summer" },
        { name: "Signature Sets", path: "/signature-sets" },
        { name: "Timeless Collections", path: "/timeless-collections" },
        { name: "Travel Tins", path: "/travel-tins" },
      ],
    },
    {
      title: "QUICK LINKS",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/faqs" },
        { name: "News", path: "/news" },
        { name: "Blog", path: "/blog" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms Of Service", path: "/terms-of-service" },
        { name: "Shipping Policy", path: "/shipping-policy" },
        { name: "Return & Refunds", path: "/return-and-refund" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      url: "https://www.facebook.com/profile.php?id=61565428497592&mibextid=JRoKGi",
    },
    {
      icon: <Instagram />,
      url: "https://www.instagram.com/scentedgleam?utm_source=qr&igsh=MXM1ZmM2dnBycjVxYQ==",
    },
  ];
  // Handle newsletter submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    console.log("Newsletter signup:", email);
    setEmail("");
    // You would typically call an API here
  };

  return (
    <footer className="bg-[#d8edee] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* STAY CONNECTED Column */}
          <div>
            <h3 className="text-lg font-medium mb-4">STAY CONNECTED</h3>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-4">
              SIGN UP FOR OUR NEWSLETTER
            </h3>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-3 py-2 border border-gray-300 flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
          <p>
            &copy; Copyright {new Date().getFullYear()}
            &nbsp; Scented Gleam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

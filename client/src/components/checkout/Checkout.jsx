import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { getCartItems, getCartTotalAmount } from "../../redux/action/cart";

const Checkout = () => {
  //   const cartItems = useSelector((state) => state.cart.items);
  const cartItems = useSelector(getCartItems);
  const totalAmount = useSelector(getCartTotalAmount);

  console.log(" Cart Items: ", cartItems);
  console.log(
    "All states",
    useSelector((state) => state)
  );
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Profile"));
//   console.log("User Profile: ", user);  

  //   useEffect(() => {
  //     // fetchCartItems();
  //     getCartItems();
  //   }, []);

  //   const fetchCartItems = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/get-cart`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       const data = await response.json();
  //       if (data.success) {
  //         setCartItems(data.cart.items || []);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cart:', error);
  //       toast.error('Failed to fetch cart items');
  //     }
  //   };

  const calculatePrices = () => {
    const itemsPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxPrice = itemsPrice * 0.18; 
    const shippingPrice = itemsPrice > 500 ? 0 : 50; 
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    return { itemsPrice, taxPrice, shippingPrice, totalPrice };
  };

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calculatePrices();

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutofillAddress = () => {
    // You can customize this with user's saved address or default values
    const defaultAddress = {
      fullName: user?.fname,
      address: "123 Main Street, Apartment 4B",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208010",
      phone: "9999999999",
    };

    setShippingAddress(defaultAddress);
    toast.success("Address autofilled successfully!");
  };

  const validateAddress = () => {
    const requiredFields = [
      "fullName",
      "address",
      "city",
      "state",
      "pincode",
      "phone",
    ];
    return requiredFields.every(
      (field) => shippingAddress[field].trim() !== ""
    );
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateAddress()) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        orderItems: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.price,
          productName: item.product.name,
          productImage: item.product.images?.[0],
        })),
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };


    console.log(orderData);
   
    //   const token = localStorage.getItem("token");
      const localStorageTempToken = user?.token || localStorage.getItem("Profile")?.token;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageTempToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      // Configure Razorpay options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Scented Gleams",
        description: "Premium Candles Purchase",
        order_id: data.orderId,
        handler: async (response) => {
          await verifyPayment(response, data.orderDbId);
        },
        prefill: {
          name: user.fname,
          email: user.email,
          contact: shippingAddress.phone,
        },
        notes: {
          address: shippingAddress.address,
        },
        theme: {
          color: "#8b4513",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentResponse, orderDbId) => {
    try {
      const localStorageTempToken = user?.token || localStorage.getItem("Profile")?.token;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageTempToken}`,
          },
          body: JSON.stringify({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            orderDbId,
          }),
        }
      );

      const data = await response.json();
      console.log("Payment verification response:", data);
      
      if (data.success) {
        toast.success("Payment successful! Order placed.");
        navigate(`/account/${user._id}?tab=orders`);
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Payment verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <button
              type="button"
              onClick={handleAutofillAddress}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              📍 Autofill Address
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex items-center space-x-4">
                <img
                  src={
                    item.product.images?.[0]
                      ? `${import.meta.env.VITE_API_URL}/uploads/${item.product.images[0]}`
                      : "https://placehold.co/64X64?text=No+Image"
                  }
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Items Price:</span>
              <span>₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18% GST):</span>
              <span>₹{taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shippingPrice.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-6 py-3 px-4 rounded-md font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white transition-colors`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

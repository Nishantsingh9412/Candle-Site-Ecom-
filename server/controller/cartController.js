import Cart from "../models/cart.js";
import Product from "../models/products.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images slug isActive",
    });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.status(200).json({
      success: true,
      cart,
      message: "Cart retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found or inactive",
      });
    }

    // Validate quantity
    if (quantity < product.minOrderQuantity) {
      return res.status(400).json({
        success: false,
        message: `Minimum order quantity is ${product.minOrderQuantity}`,
      });
    }

    if (product.maxOrderQuantity && quantity > product.maxOrderQuantity) {
      return res.status(400).json({
        success: false,
        message: `Maximum order quantity is ${product.maxOrderQuantity}`,
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      // Validate new quantity
      if (product.maxOrderQuantity && newQuantity > product.maxOrderQuantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more. Maximum order quantity is ${product.maxOrderQuantity}`,
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    // Populate product details for response
    await cart.populate({
      path: "items.product",
      select: "name price images slug isActive",
    });

    res.status(200).json({
      success: true,
      cart,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Validate quantity
    if (quantity < product.minOrderQuantity) {
      return res.status(400).json({
        success: false,
        message: `Minimum order quantity is ${product.minOrderQuantity}`,
      });
    }

    if (product.maxOrderQuantity && quantity > product.maxOrderQuantity) {
      return res.status(400).json({
        success: false,
        message: `Maximum order quantity is ${product.maxOrderQuantity}`,
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name price images slug isActive",
    });

    res.status(200).json({
      success: true,
      cart,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name price images slug isActive",
    });

    res.status(200).json({
      success: true,
      cart,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("This is user Id from Cart Controller:", userId);

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Sync cart (for bulk operations)
export const syncCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items must be an array",
      });
    }

    // Validate all products exist
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ 
      _id: { $in: productIds },
      isActive: true 
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message: "Some products are not available",
      });
    }

    // Create product map for quick lookup
    const productMap = {};
    products.forEach(product => {
      productMap[product._id.toString()] = product;
    });

    // Validate quantities and create cart items
    const cartItems = [];
    for (const item of items) {
      const product = productMap[item.productId];
      
      if (item.quantity < product.minOrderQuantity) {
        return res.status(400).json({
          success: false,
          message: `Minimum order quantity for ${product.name} is ${product.minOrderQuantity}`,
        });
      }

      if (product.maxOrderQuantity && item.quantity > product.maxOrderQuantity) {
        return res.status(400).json({
          success: false,
          message: `Maximum order quantity for ${product.name} is ${product.maxOrderQuantity}`,
        });
      }

      cartItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: cartItems });
    } else {
      cart.items = cartItems;
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name price images slug isActive",
    });

    res.status(200).json({
      success: true,
      cart,
      message: "Cart synced successfully",
    });
  } catch (error) {
    console.error("Error syncing cart:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

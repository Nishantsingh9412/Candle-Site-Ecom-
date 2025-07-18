import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  // Check if authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }
  // Extract token from header
  const token = req.headers.authorization?.split(" ")[1];
  // If no token is found, return unauthorized
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "No token provided" 
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, ...decoded };
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid token",
    });
  }
};
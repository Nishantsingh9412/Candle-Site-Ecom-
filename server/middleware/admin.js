import auth from "../models/auth.js";

export const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  const UserRole = await auth.findById(req.user.id).select("role");

  if (UserRole.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admins only",
    });
  }
  next();
};

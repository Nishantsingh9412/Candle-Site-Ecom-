// server.js
import './config.js'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import otpRoutes from "./routes/otp.js";
import CategoryRoutes from "./routes/category.js";
import subCategoryRoutes from "./routes/subCategory.js";
import productRoutes from "./routes/product.js";
import reviewRoutes from "./routes/review.js"
import collectionRoutes from "./routes/collection.js";
// import common
// import ProductRoutes from "./routes/productRoutes.js";
// import progressRoute from "./routes/progress.js";


const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your front-end URL
  credentials: true,
};
app.use(cors(corsOptions));

// app.use('/api/v1/progress',progressRoute);
// --------------------------- authRoutes and otpRoutes ---------------------------
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/otp', otpRoutes);

// -------------------------- Products Routes ---------------------------
app.use('/api/v1/category',CategoryRoutes);
app.use('/api/v1/sub-category', subCategoryRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/products',productRoutes);
app.use('/api/v1/collections', collectionRoutes);
// app.use('/api/v1/wishlist', WishlistRoutes); 
// app.use('/api/v1/product', ProductRoutes);  






// ----------------------------deployment--------------------------------------

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(("./frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend", "dist", "index.html"));
  });

} else {
  app.get('/', (req, res) => {
    res.send("Welcome to Scented Gleam's API's ")
  })
}
// ----------------------------deployment--------------------------------------
const PORT = process.env.PORT || 8081;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on PORT ${PORT}`);
    })
    // server.listen(PORT, () => {
    //   console.log(`server running on PORT ${PORT}`);
    // })
  )
  .catch((err) => console.log(err));

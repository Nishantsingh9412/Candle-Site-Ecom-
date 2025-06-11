// server.js
import './config.js'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import otpRoutes from "./routes/otpRoutes.js";
import CategoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
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
app.use('/api/v1/otp', otpRoutes)

// -------------------------- shopping cart and wishlist routes ---------------------------
app.use('/api/v1/category',CategoryRoutes);
app.use('/api/v1/sub-category', subCategoryRoutes);
app.use('/api/v1/review', reviewRoutes)
app.use('/api/v1/products',productRoutes)
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
    res.send("Welcome to Flock AI API's ")
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

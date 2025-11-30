import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// CONFIG
import connectDB from "./config/db.js";

// MIDDLEWARE
import { errorHandler } from "./middleware/errorHandler.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow frontend to access backend)
app.use(cors());

// STATIC uploads folder (only needed if using local upload)
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

// ERROR HANDLER (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

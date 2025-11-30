import multer from "multer";
import path from "path";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// =============== CLOUDINARY CONFIG =============== //
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// =============== CLOUDINARY STORAGE =============== //
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Upload to Cloudinary
export const uploadCloud = multer({ storage: cloudinaryStorage });

// =============== LOCAL STORAGE (optional) =============== //
const localStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const uploadLocal = multer({
  storage: localStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

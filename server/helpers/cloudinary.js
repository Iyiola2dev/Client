import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Memory storage for multer
const storage = multer.memoryStorage();

// Function to upload image buffer to Cloudinary
async function imageUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(new Error("Upload to Cloudinary failed"));
        resolve(result);
      }
    );
    uploadStream.end(buffer); // Send the buffer to Cloudinary
  });
}

// Multer instance
const upload = multer({ storage });

export { upload, imageUploadUtil };

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//this is my memory storage
const storage = new multer.memoryStorage();

//And this is the function that will return the result
async function imageUploadUtil(file) {

  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

//here i will be using the multer instances
const upload = multer({ storage });


/// Export the multer instance and upload utility
export { upload, imageUploadUtil };

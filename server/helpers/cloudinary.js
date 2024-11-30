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
   //I made a mistake by using the UploadStream.upload method instead of the uploader.upload method i didn't remove the UploadStream.upload method i just commented it out so i don't forget my mistake and i can learn from it. So the correct method is the uploader.upload method and not the UploadStream.upload method

//   const result = await cloudinary.UploadStream.upload(file, {
//     resource_type: "auto",
//   });
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

//here i will be using the multer instances
const upload = multer({ storage });


/// Export the multer instance and upload utility
export { upload, imageUploadUtil };

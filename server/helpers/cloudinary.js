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
async function imageUploadUtil(buffers) {
  const uploadPromises = buffers.map((buffer) =>
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) throw new Error("Upload to Cloudinary failed");
        return result;
      })
      .end(buffer)
  );

  const results = await Promise.all(uploadPromises);
  return results; // Array of uploaded image objects
}


//here i will be using the multer instances
const upload = multer({ storage });


/// Export the multer instance and upload utility
export { upload, imageUploadUtil };

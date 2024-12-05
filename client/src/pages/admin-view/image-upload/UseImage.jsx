
import { useState } from "react";
import axios from "axios";

const useImageUpload = (uploadUrl) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("my_file", imageFile);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.data?.success) {
        setUploadedImageURL(response.data.result.url);
      } else {
        console.error("Image upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageFile,
    uploadedImageURL,
    isLoading,
    handleImageChange,
    uploadImage,
    setImageFile,
    setUploadedImageURL,
  };
};

export default useImageUpload;

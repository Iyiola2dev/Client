import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const MultiImageUpload = ({
  uploadedImageURLs, // Array to hold uploaded image URLs
  
  setUploadedImageURLs, // Function to update uploaded image URLs
  setImageLoadingState, // Function to update loading state
  imageLoadingState, // Boolean for loading state
}) => {
  const inputRef = useRef(null);

  const [imageFiles, setImageFiles] = useState([]); // State to store selected image files

  // Handle file selection
  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Add to the existing files
  };

  // Handle drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImageFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Remove a specific file
  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Upload images to the server
  const uploadImagesToCloudinary = async () => {
    try {
      setImageLoadingState(true);

      const uploadedURLs = []; // To hold uploaded image URLs
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("my_file", file);

        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-images",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response?.data?.success) {
          uploadedURLs.push(response.data.result.url); // Push URL to array
        }
      }

      setUploadedImageURLs(uploadedURLs); // Update state with uploaded image URLs
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setImageLoadingState(false);
    }
  };

  // Upload images when files are selected
  useEffect(() => {
    if (imageFiles.length > 0) {
      uploadImagesToCloudinary();
    }
  }, [imageFiles]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold my-2 block">Upload Images</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-md p-4 mt-4"
      >
        <Input
          id="image-upload"
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFiles.length ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload images</span>
          </Label>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white rounded-full shadow-md"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remove File</span>
                  </Button>
                </div>
              ))}
            </div>
            {imageLoadingState && (
              <Skeleton className="h-10 bg-gray-100 mt-2 col-span-2" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MultiImageUpload;

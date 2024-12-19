import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const ProductImageUpload = ({
  uploadedImageURLs, // Array for uploaded image URLs
  setUploadedImageURLs, // Function to update uploaded image URLs state
  setImageLoadingState, // Function to update loading state
  imageLoadingState, // Loading state
  isEditMode, // Edit mode flag
}) => {
  const inputRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]); // Track multiple image files

  // Handle file selection
  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length) {
      setImageFiles([...imageFiles, ...selectedFiles]); // Append to existing files
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setImageFiles([...imageFiles, ...droppedFiles]); // Append dropped files
    }
  };

  // Remove a specific file
  const handleRemoveImage = (fileIndex) => {
    setImageFiles(imageFiles.filter((_, index) => index !== fileIndex));
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    imageFiles.forEach((file) => {
      data.append("my_file", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-images",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.success) {
        const uploadedUrls = response.data.results
          .filter((result) => !result.error) // Filter out any failed uploads
          .map((result) => result.url); // Extract URLs
        setUploadedImageURLs([...uploadedImageURLs, ...uploadedUrls]); // Append to existing URLs
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  // Upload images when files change
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
        className={` ${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-md p-4 mt-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple // Allow multiple files
        />
        {!imageFiles.length ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col justify-center items-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag and drop or click to upload images</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="space-y-2">
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-2 rounded-md"
              >
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                  <p className="text-sm font-medium">{file.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;

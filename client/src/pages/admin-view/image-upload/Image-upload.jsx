import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const ProductImageUpload = ({
  uploadedImageURLs,
  setUploadedImageURLs,
  setImageLoadingState,
}) => {
  const [previewURLs, setPreviewURLs] = useState([]);

  const handleImageFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Generate previews for the selected images
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviewURLs(previews);

    setImageLoadingState(true);

    // Upload each file to the backend
    const uploadPromises = selectedFiles.map(async (file) => {
      const data = new FormData();
      data.append("my_file", file);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-images",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Uploaded Image URL:", response.data?.images?.[0]?.url);
      return response.data?.images?.[0]?.url; // Get the URL of the uploaded image
    });

    const uploadedURLs = await Promise.all(uploadPromises);
    console.log("All Uploaded URLs:", uploadedURLs); // Check the resolved URLs
    setUploadedImageURLs((prev) => [...prev, ...uploadedURLs]);

    setImageLoadingState(false);

    // Revoke the created object URLs to free memory
    previews.forEach((url) => URL.revokeObjectURL(url));
  };

  const handleRemoveImage = (index) => {
    setPreviewURLs((prev) => prev.filter((_, i) => i !== index));
    setUploadedImageURLs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-lg font-semibold my-2 block">Upload Images</Label>
      <Input
        type="file"
        className="hidden"
        id="image-upload"
        name="my_file"
        multiple
        onChange={handleImageFileChange}
      />
      <Label
        htmlFor="image-upload"
        className="flex flex-col justify-center items-center h-32 cursor-pointer border-2 border-dashed rounded-md p-4"
      >
        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
        <span>Drag and drop or click to upload images</span>
      </Label>

      {/* Preview Section */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {previewURLs.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="h-20 w-20 object-cover rounded"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1"
              onClick={() => handleRemoveImage(index)}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUpload;

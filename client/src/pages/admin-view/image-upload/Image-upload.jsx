import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";

const ProductImageUpload = ({
  imageFile, // Prop for the selected image file
  setImageFile, // Function to update the selected image file state
  uploadedImageURL, // Prop for the uploaded image URL
  setUploadedImageURL, // Function to update the uploaded image URL state
  setImageLoadingState, // Function to update the loading state
}) => {
  // Creating a reference for the file input element
  const inputRef = useRef(null);

  // Function to handle changes in the file input
  const handleImageFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      //if the file is selected, the setImageFile function is called to update the selected image file state
      setImageFile(selectedFile);
      //   setuploadedImageURL(URL.createObjectURL(selectefFile));
    }
  };

  // Function to handle drag over events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop events
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  // Function to remove the selected image file
  const handleRemoveImage = () => {
    setImageFile(null);
    //this is to clear the input field if there is something inside the inpur field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // This is the  Function to upload the image to Cloudinary
  const uploadImageToCloudinary = async () => {
    // Set the loading state to true
    setImageLoadingState(true);
    // Create a new FormData object
    const dataImage = new FormData();
    // Append the image file to the FormData object
    dataImage.append("my_file", imageFile);
    // Send a POST request to the server to upload the image
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      dataImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.success) {
      console.log(response.data);
      setUploadedImageURL(response.data.result.url);

      // Set the loading state to false
      setImageLoadingState(false);
    }
    // // Parse the JSON response
    // const data = await response.json();
    // // Update the uploaded image URL state with the URL of the uploaded image
    // setUploadedImageURL(data.result.secure_url);
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  // Return the image upload component
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Container for the image upload component */}
      <Label className="text-lg font-semibold my-2 block">Upload Image</Label>

      {/* // Container for the image upload component */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-md p-4 mt-4"
      >
        <Input
          id="image-upload" // Unique identifier for the input element
          type="file" // Specifies the input type as file
          className="hidden" //  this to hide the input element visually
          ref={inputRef} // Reference to the file input element
          onChange={handleImageFileChange} // Event handler for file selection changes
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>

            <p className="text-sm font-medium">{imageFile.name}</p>

            {/* This is to remove the file */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;

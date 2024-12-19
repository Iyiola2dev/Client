import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const ProductImageUpload = ({
  imageFile, // Prop for the selected image file
  setImageFile, // Function to update the selected image file state
  uploadedImageURL, // Prop for the uploaded image URL
  setUploadedImageURL, // Function to update the uploaded image URL state
  setImageLoadingState, // Function to update the loading state
  imageLoadingState, // Prop for the loading state
  isEditMode, // This prop is used to determine if the component is in edit mode
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
    dataImage.append("my_file", imageFile);
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
        className={` ${
          isEditMode ? "opacity-60" : ""
        }border-2 border-dashed rounded-md p-4 mt-4`}
      >
        <Input
          id="image-upload" // Unique identifier for the input element
          type="file" // Specifies the input type as file
          className="hidden" //  this to hide the input element visually
          ref={inputRef} // Reference to the file input element
          onChange={handleImageFileChange} // Event handler for file selection changes
          disabled={isEditMode} // Disables the input element if the component is in edit mode
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` ${
              // this action is activated when it's on edit mode and the cursor is not allowed
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col justify-center items-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";

const ProductImageUpload = ({
  uploadedImageURLs,
  setUploadedImageURLs,
  setImageLoadingState,
}) => {

  
//   ADA
//   const [previewURLs, setPreviewURLs] = useState([]);

  // Creating a reference for the file input element
  const inputRef = useRef(null);
  const [primaryImage, setPrimaryImage] = useState(null);


  const handleImageFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);


    
    //ADA
    // Generate previews for the selected images
//     const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    console.log("selectedFile2", selectedFile);
    // selectedFile.forEach((file) => {
    //   const fileData = file;
    //   console.log("file", fileData);
    //   uploadImageToCloudinary(fileData);
    // })
  };

  // this is for mutile images
  // const handleImageFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   console.log("selectedFiles", selectedFiles);

  //   if (selectedFiles.length > 0) {
  //     setImageFile(selectedFiles); // Save all selected files
  //   }
  // };

  // Function to handle drag over events
  //   const selectedFiles = Array.from(e.target.files);
  //   setImageFile(selectedFiles);

  //   setImageLoadingState(true);
  //   const uploadedURLs = await Promise.all(
  //     selectedFiles.map((file) => uploadImageToCloudinary(file))
  //   );
  //   setImageLoadingState(false);

  //   const validURLs = uploadedURLs.filter((url) => url !== null);
  //   setUploadedImageURL(validURLs);

  //   // Send the array of URLs to your backend
  //   await axios.post("http://localhost:5000/api/admin/products/upload-image", {
  //     imageUrls: validURLs,
  //   });
  // };

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

// ADA
//       console.log("Uploaded Image URL:", response.data?.images?.[0]?.url);
//       return response.data?.images?.[0]?.url; // Get the URL of the uploaded image
//     });

//     const uploadedURLs = await Promise.all(uploadPromises);
//     console.log("All Uploaded URLs:", uploadedURLs); // Check the resolved URLs
//     setUploadedImageURLs((prev) => [...prev, ...uploadedURLs]);

//     setImageLoadingState(false);

//     // Revoke the created object URLs to free memory
//     previews.forEach((url) => URL.revokeObjectURL(url));
//   };

//   const handleRemoveImage = (index) => {
//     setPreviewURLs((prev) => prev.filter((_, i) => i !== index));
//     setUploadedImageURLs((prev) => prev.filter((_, i) => i !== index));
//   };


      // Set the loading state to false
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  // const uploadImagesToCloudinary = async (imageFiles) => {
  //   setImageLoadingState(true);

  //   const uploadedURLs = await Promise.all(
  //     imageFiles.map(async (file) => {
  //       try {
  //         const formData = new FormData();
  //         formData.append("my_file", file);

  //         const response = await axios.post(
  //           "http://localhost:5000/api/admin/products/upload-images",
  //           formData,
  //           { headers: { "Content-Type": "multipart/form-data" } }
  //         );

  //         if (response?.data?.success) {
  //           return response.data.result?.url; // Access the URL safely
  //         }
  //         else {
  //           console.error("Upload failed for file:", file.name, response.data);
  //           return null; // Return null if upload fails for this file
  //         }
  //       } catch (error) {
  //         console.error("Error uploading file:", file.name, error);
  //         return null; // Handle any unexpected errors
  //       }
  //     })
  //   );

  //   setImageLoadingState(false);

  //   // Filter out null values from the uploaded URLs
  //   const validURLs = uploadedURLs.filter((url) => url !== null);

  //   if (validURLs.length > 0) {
  //     setUploadedImageURL(validURLs); // Update with all URLs
  //     // Set the first URL as the primary image
  //     setPrimaryImage(validURLs[0]);
  //   } else {
  //     console.error("No valid URLs were returned from the uploads.");
  //   }
  // };

  // useEffect(() => {
  //   if (imageFile?.length > 0) {
  //     uploadImagesToCloudinary(imageFile);
  //   }
  // }, [imageFile]);

  // Return the image upload component

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


// ADA
//         <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
//         <span>Drag and drop or click to upload images</span>
//       </Label>

//       {/* Preview Section */}
//       <div className="grid grid-cols-3 gap-4 mt-4">
//         {previewURLs.map((url, index) => (
//           <div key={index} className="relative">
//             <img
//               src={url}
//               alt={`Preview ${index}`}
//               className="h-20 w-20 object-cover rounded"
//             />

        <Input
          id="image-upload" // Unique identifier for the input element
          type="file" // Specifies the input type as file
          className="hidden" //  this to hide the input element visually
          multiple // Allow multiple file selection
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
              className="absolute top-1 right-1"
              onClick={() => handleRemoveImage(index)}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>

    //   //updated code
    //   <div className="w-full max-w-md mx-auto">
    //   <Label className="text-lg font-semibold my-2 block">Upload Images</Label>
    //   <div
    //     onDragOver={handleDragOver}
    //     onDrop={handleDrop}
    //     className={`${
    //       isEditMode ? "opacity-60" : ""
    //     } border-2 border-dashed rounded-md p-4 mt-4`}
    //   >
    //     <Input
    //       id="image-upload"
    //       type="file"
    //       className="hidden"
    //       multiple
    //       ref={inputRef}
    //       onChange={handleImageFileChange}
    //       disabled={isEditMode}
    //     />
    //     {!imageFile || imageFile.length === 0 ? (
    //       <Label
    //         htmlFor="image-upload"
    //         className={`${
    //           isEditMode ? "cursor-not-allowed" : ""
    //         } flex flex-col justify-center items-center h-32 cursor-pointer`}
    //       >
    //         <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
    //         <span>Drag and drop or click to upload images</span>
    //       </Label>
    //     ) : (
    //       <div className="grid grid-cols-1 gap-4">
    //         {imageFile.map((file, index) => (
    //           <div
    //             key={index}
    //             className="relative border rounded p-2 flex flex-col items-center"
    //           >
    //             <div className="w-16 h-16 mb-2">
    //               <img
    //                 src={URL.createObjectURL(file)}
    //                 alt={file.name}
    //                 className="object-cover w-full h-full rounded"
    //               />
    //             </div>
    //             <p className="text-sm truncate">{file.name}</p>
    //             <Button
    //               variant="ghost"
    //               size="icon"
    //               className="absolute top-1 right-1"
    //               onClick={() => handleRemoveImage(index)}
    //             >
    //               <XIcon className="w-4 h-4" />
    //               <span className="sr-only">Remove File</span>
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    //   {imageLoadingState && <Skeleton className="h-10 bg-gray-100 mt-4" />}
    // </div>
  );
};

export default ProductImageUpload;

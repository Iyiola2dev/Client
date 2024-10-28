import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/Index";
import React, { useState } from "react";
import ProductImageUpload from "./image-upload/Image-upload";
const initialFormData = {
  image: null,
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
  productType: "",
  sales: "",
};

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");

  //this is a loading state
const [imageLoadingState, setImageLoadingState] = useState(false);
  
  function onSumbit() {
    console.log(formData);
  }
  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => setOpenCreateProduct(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          {/* The image upLoad component */}
          {/* The props is passed to the productimageupload component */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setuploadedImageURL={setUploadedImageURL}
            setImageLoadingState={setImageLoadingState}
          />

          {/* This is the commonform component */}
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText="Add Product"
              borderRadius="rounded-md"
              onSubmit={onSumbit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;

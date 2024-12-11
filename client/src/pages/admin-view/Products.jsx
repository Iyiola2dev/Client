import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/index";


import { useEffect, useState } from "react";
import ProductImageUpload from "./image-upload/Image-upload";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import AdminProductTile from "./admin-view2/Product-tile";
import MultiImageUpload from "./therapycreation/Multiple";





//
const initialFormData = {
  image: null,
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
  types: "",
  productType: "",
  sales: "",
};

const AdminProducts = () => {
  //this is the state to open the create product form
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  //this is the state to store the form data
  const [formData, setFormData] = useState(initialFormData);
  //this is the state to store the image file
  const [imageFile, setImageFile] = useState(null);
  //this is the state to store the uploaded image url
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const { toast } = useToast();
  //This is for the edit of product this state is to store the current id before it is edited
  const [currentEditedId, setCurrentEditedId] = useState(null);

  //this is to get the product list and the adminProduct is the reducer name
  const { productList, isLoading } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  //this is a loading state
  const [imageLoadingState, setImageLoadingState] = useState(false);

  //this is to submit the form
  function onSumbit(e) {
    e.preventDefault();
    //this is to check if the currentEditedId is true and i pass in the edited product Api from my async thunk
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            // console.log(data, "edit");
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setOpenCreateProduct(false);
              setCurrentEditedId(null);
            }
          }
        )
      : dispatch(addNewProduct({ ...formData, image: uploadedImageURL })).then(
          (data) => {
            // console.log(data);
            if (data?.payload?.success) {
              //this if the sucess is true, the image file is set to null, the form data is set to the initial form data and the open create product is set to false basically to reset the form
              dispatch(fetchAllProducts());
              setImageFile(null);
              setFormData(initialFormData);
              setOpenCreateProduct(false);
              toast({
                title: "Product added successfully",
              });
            }
          }
        );
  }

  //This is to check if the form is valid if not the button will be disabled
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  } //This function is to check if the form is vaild if not the form button will be disabled

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  // Function to handle delete
  const handleDelete = (getCurrentProductId) => {
    console.log(getCurrentProductId, "getCurrentProductId");

    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        //This will get all the recent product
        dispatch(fetchAllProducts());
        // Display the success message
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  // console.log(productList.data, uploadedImageURL, "productList");
  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add New Product
        </Button>
      </div>
      {/* This is the product tile card */}
      <div className="grid gap-4 md:grid-cols-3  ">
        {productList?.data?.length > 0 ? (
          productList.data.map((productItem, i) => (
            <AdminProductTile
              key={i}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProduct={setOpenCreateProduct}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No product found</p>
        )}
      </div>

      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          //This is to make the dialog box to close and reset the form
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {/* This is to check if the currentEditedId is true The title shows true and if it's not  */}
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          {/* The image upLoad component */}
          {/* The props is passed to the productimageupload component */}


          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          {/* <MultiImageUpload/> */}


        
          {/* This is the commonform component */}
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add Product"}
              borderRadius="rounded-md"
              onSubmit={onSumbit}
              isBtnDisable={!isFormValid}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;

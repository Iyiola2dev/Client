


//this is our form control configuration file
export const registerFormControls = [
    {
      name: "userName",
  
      placeholder: "Enter your username",
      componentType: "input",
      type: "text",
      // options : []
    },
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  export const loginFormControls = [
    {
      name: "email",
  
      placeholder: "Enter your email",
      componentType: "input",
      type: "text",
    },
  
    {
      name: "password",
  
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
    // {
    //     name: "confirmPassword",
    //     label: "Confirm Password",
    //     placeholder: "Confirm your password",
    //     componentType: "input",
    //     type: "password",
    // },
  ];
  
  //The form control configuration for the add product form
  export const addProductFormElements = [
    {
      id: "product-name",
      name: "name",
      label: "Product Name",
      placeholder: "Enter product name",
      componentType: "input",
      type: "text",
    },
    {
      id: "product-price",
      name: "price",
      label: "Product Price",
      placeholder: "Enter product price",
      componentType: "input",
      type: "number",
    },
    {
      id: "product-description",
      name: "description",
      label: "Product Description",
      placeholder: "Enter product description",
      componentType: "textarea",
    },
    // Uncomment the following if you want to include an image URL field
    // {
    //   id: "product-image",
    //   name: "image",
    //   label: "Image URL",
    //   placeholder: "Enter image URL",
    //   componentType: "input",
    //   type: "text",
    // },
    {
      id: "product-stock",
      name: "stock",
      label: "Stock Quantity",
      placeholder: "Enter stock quantity",
      componentType: "input",
      type: "number",
    },
    {
      id: "product-type",
      name: "types",
      label: "Product type",
      placeholder: "Enter the Product type",
      componentType: "input",
      type: "string",
    },
    {
      id: "category",
      name: "category",
      label: "Category",
      componentType: "select",
      options: [
        { id: "type-man", value: "man", label: "Man" },
        { id: "type-woman", value: "woman", label: "Woman" },
      ],
    },
    {
      id: "product-sales",
      name: "sales",
      label: "Sales (Optional)",
      placeholder: "Enter sales quantity (optional)",
      componentType: "input",
      type: "number",
    },
  ];
  
  
  
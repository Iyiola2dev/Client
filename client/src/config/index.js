


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
        { id: "type-man", value: "men", label: "Men" },
        { id: "type-woman", value: "women", label: "Women" },
        { id: "type-couples", value: "couples", label: "Couples" },
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
  

  //
  export const sortOptions = [
    {id: "price-low-high",  label: "Price: Low - High"},
    {id: "price-high-low",  label: "Price:  High - Low"},
    {id: "title-a-z",  label: "Price:  A - Z"},
    {id: "title-z-a",  label: "Price:  Z - A"},
  ]
  
  
  
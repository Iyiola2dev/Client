import { useState } from "react";

import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress } from "@/store/shop/address-slice";

const initialAddressFormData = {
  address: "",
  city: "",
  phoneNumber: "",
  addtionalNumber: "",
  notesInformation: "",
  region: "",
};

const AddressForm = () => {
    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleManageAddress = (e) => {
      e.preventDefault();
      dispatch(addNewAddress({ userId: user?.id, ...formData })).then(data=>{
        console.log(data);
      });
    };
  
    const isFormValid = () => {
      return Object.keys(formData)
        .map((key) => formData[key].trim() !== "")
        .every((value) => value === true);
    };
  
  return (
    <div className="max-w-2xl mx-auto p-4 bg-black shadow-md rounded-lg">
    <h2 className="text-xl font-bold mb-4 text-white">Contact Information</h2>
    <form onSubmit={handleManageAddress} className="space-y-4">
      {addressFormControls.map((formControl) => (
        <div key={formControl.id} className="flex flex-col">
          <label
            htmlFor={formControl.id}
            className="mb-2 font-medium text-white"
          >
            {formControl.label}
          </label>
          {formControl.componentType === "input" && (
            <input
              id={formControl.id}
              name={formControl.name}
              type={formControl.type}
              placeholder={formControl.placeholder}
              value={formData[formControl.name]}
              onChange={handleInputChange}
              className="p-2 border rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          )}
          {formControl.componentType === "textarea" && (
            <textarea
              id={formControl.id}
              name={formControl.name}
              placeholder={formControl.placeholder}
              value={formData[formControl.name]}
              onChange={handleInputChange}
              className="p-2 border rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          )}
          {formControl.componentType === "select" && (
            <select
              id={formControl.id}
              name={formControl.name}
              value={formData[formControl.name]}
              onChange={handleInputChange}
              className="p-2 border rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 "
            >
              {formControl.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
         
          className="w-[30%] p-3 bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white font-medium rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save
        </button>
        <button
          type="submit"
          className="w-[30%] p-3 bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white font-medium rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  )
}

export default AddressForm
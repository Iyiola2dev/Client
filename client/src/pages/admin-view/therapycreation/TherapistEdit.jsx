import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";
import { updateTherapist } from "@/store/therapy/therapist-slice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";


const TherapistEdit = ({ therapistData }) => {
  const [therapist, setTherapist] = useState(therapistData || {});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    therapistData?.imageUrl || ""
  );
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const dispatch = useDispatch();

  const { toast } = useToast(); // Initialize the useToast hook

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTherapist({ ...therapist, [name]: value });
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setTherapist({ ...therapist, imageUrl: "" }); // Remove image URL from data
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    // Prepare form data if there's a new image
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Add therapist data to the form
    Object.keys(therapist).forEach((key) => {
      formData.append(key, therapist[key]);
    });

    try {
      // Dispatch the updateTherapist thunk
      dispatch(updateTherapist(formData));

      // Show success toast
      toast({
        title: "Success!",
        description: "Changes saved successfully!",
        status: "success", // 'success' status
        duration: 5000,
        isClosable: true,
      });

      window.history.back();
    } catch (error) {
      // Show error toast
      toast({
        title: "Error!",
        description: "Failed to save changes.",
        status: "error", // 'error' status
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="py-20">
      {/* Back Button */}
      <div className="block mb-8 lg:ml-14 ">
        <button onClick={goBack}>
          <FaArrowLeftLong className="pl-4 w-[40px] h-[20px] text-pink-500" />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[90vw] lg:w-1/2 bg-white p-10 rounded-lg shadow-md">
          {/* Image and Upload/Delete Buttons */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <div className="relative h-[180px] w-[180px] bg-slate-200 rounded-full border-4 border-slate-200 overflow-hidden">
              <img
                src={imagePreview || "https://via.placeholder.com/180"}
                alt="therapist"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="upload"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              >
                <IoCameraReverseOutline className="w-8 h-8" />
              </label>
              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <label
                htmlFor="upload"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer"
              >
                Upload New
              </label>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
                onClick={handleDeleteImage}
                type="button"
              >
                Delete Avatar
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={therapist.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={therapist.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email and Mobile Number */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={therapist.email || ""}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={therapist.phone || ""}
                  onChange={handleInputChange}
                  placeholder="+234"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Gender and Zodiac Sign */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={therapist.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={therapist.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Zodiac Sign
                </label>
                <input
                  type="text"
                  name="zodiacSign"
                  value={therapist.zodiacSign || ""}
                  onChange={handleInputChange}
                  placeholder="Cancer"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* D.O.B, Marital Status, Age Range */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  D.O.B
                </label>
                <input
                  type="date"
                  name="dob"
                  value={therapist.dob || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={therapist.maritalStatus || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  Age Range
                </label>
                <select
                  name="ageRange"
                  value={therapist.ageRange || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>36-45</option>
                  <option>46-55</option>
                </select>
              </div>
            </div>

            {/* Languages, State of Practice */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  name="languages"
                  value={therapist.languages || ""}
                  onChange={handleInputChange}
                  placeholder="English, Yoruba"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">
                  State of Practice
                </label>
                <input
                  type="text"
                  name="stateOfPractice"
                  value={therapist.stateOfPractice || ""}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                {isLoading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistEdit;

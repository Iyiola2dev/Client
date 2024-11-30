import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";
import { updateTherapist } from "@/store/therapy/therapist-slice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

const TherapistEdit = ({ therapistData: propTherapistData }) => {
  const location = useLocation();
  const locationTherapistData = location.state?.therapistData;

  // Prefer location data if available, otherwise use prop
  const [therapist, setTherapist] = useState(
    locationTherapistData || propTherapistData || {}
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    locationTherapistData?.imageUrl || propTherapistData?.imageUrl || ""
  );
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const dispatch = useDispatch();

  const { toast } = useToast(); // Initialize the useToast hook

  useEffect(() => {
    console.log("Therapist data:", locationTherapistData || propTherapistData);
    setTherapist(locationTherapistData || propTherapistData || {});
  }, [locationTherapistData, propTherapistData]);

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

    try {
      if (!therapist._id) {
        throw new Error("Therapist ID is missing. Cannot update therapist.");
      }

      let imageUrl = therapist.imageUrl;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const response = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          imageUrl = result.url;
        } else {
          throw new Error(result.message || "Image upload failed");
        }
      }

      const updatedData = { ...therapist, _id: therapist._id, imageUrl };

      const updateResponse = await dispatch(
        updateTherapist(updatedData)
      ).unwrap();

      if (updateResponse.success) {
        toast({
          title: "Success!",
          description: "Changes saved successfully!",
          status: "success",
          duration: 5000,
          isclosable: true.toString(),
        });

        window.history.back();
      } else {
        throw new Error(updateResponse.message || "Failed to save changes.");
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Failed to save changes.",
        status: "error",
        duration: 5000,
        isclosable: true.toString(),
      });
    } finally {
      setIsLoading(false);
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
                  <option>18-28</option>
                  <option>28-38</option>
                  <option>38-48</option>
                  <option>48-58</option>
                  <option>59+</option>
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

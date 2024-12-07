import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTherapist } from "@/store/therapy/therapist-slice";
// import { FiUser } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import useImageUpload from "../image-upload/UseImage";
import { FaArrowLeftLong } from "react-icons/fa6";

const TherapistCreate = () => {
  const dispatch = useDispatch();

  // Image upload hook
  const {
    imageFile,
    uploadedImageURL,
    isLoading: isUploading,
    handleImageChange,
    uploadImage,
  } = useImageUpload("http://localhost:5000/api/uploads");

  // Therapist form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    summary: "",
    specialty: "",
    dob: "",
    mobile: "",
    email: "",
    maritalStatus: "Single",
    gender: "Male",
    clientAge: "18-28",
    therapyType: [],
    yearsOfPractice: 0,
    institute: "",
    degree: "",
    languages: [],
    stateOfPractice: "",
    zodiacSign: "",
    description: "",
    openings: [{ day: "", times: [] }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOpening = () => {
    setFormData((prev) => ({
      ...prev,
      openings: [...prev.openings, { day: "", times: [] }],
    }));
  };

  const handleOpeningChange = (index, field, value) => {
    const updatedOpenings = [...formData.openings];
    updatedOpenings[index][field] = value;
    setFormData((prev) => ({ ...prev, openings: updatedOpenings }));
  };

  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, ""],
    }));
  };

  const handleLanguageChange = (index, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = value;
    setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "dob",
      "specialty",
      "yearsOfPractice",
      "degree",
      "institute",
      "stateOfPractice",
      "gender",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    if (imageFile) {
      await uploadImage();
    }

    const payload = {
      ...formData,
      imageUrl: uploadedImageURL || "https://via.placeholder.com/150",
    };

    console.log(payload); // Debugging
    dispatch(createNewTherapist(payload));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleImageChange(acceptedFiles[0]);
    },
    accept: "image/*",
    multiple: false,
  });

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="my-20 lg:my-5 ">
      <div className=" pl-4 lg:pl-[5rem] ">
        <button onClick={goBack} type="button">
          <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
        </button>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
        <h1 className="list-item-text-3 text-2xl font-bold mb-4">
          Create New Therapist
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-lg font-medium">
              Upload Profile Picture
            </label>
            <div className="flex justify-center items-center ">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded cursor-pointer text-center 
              ${isDragActive ? "border-blue-500" : "border-gray-300"} 
              w-48 h-48 p-4 flex justify-center items-center`}
              >
                <input {...getInputProps()} />
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="mx-auto mb-2 h-24 w-24 rounded-full object-cover"
                    />
                    <p>Click to change the image</p>
                  </div>
                ) : (
                  <p>Drag & drop an image here, or click to select</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {" "}
              <label className="text-lg font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-lg font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="text-lg font-medium">Description</label>
            <textarea
              name="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div>
              <label className="text-lg font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                placeholder="+234"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Age Range */}
            <div>
              <label className="text-lg font-medium">Age Range</label>
              <select
                name="clientAge"
                value={formData.clientAge}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="18-28">18-28</option>
                <option value="28-38">28-38</option>
                <option value="38-48">38-48</option>
                <option value="48-58">48-58</option>
                <option value="59+">59+</option>
              </select>
            </div>

            {/* Zodiac Sign */}
            <div>
              <label className="text-lg font-medium">Zodiac Sign</label>
              <input
                type="text"
                name="zodiacSign"
                placeholder="Zodiac Sign"
                value={formData.zodiacSign}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-lg font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Therapy Type */}
            <div>
              <label className="text-lg font-medium">Therapy Type</label>
              <input
                type="text"
                name="therapyType"
                placeholder="e.g., CBT, Art Therapy"
                value={formData.therapyType.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    therapyType: e.target.value
                      .split(",")
                      .map((type) => type.trim()),
                  }))
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Years of Practice */}
            <div>
              <label className="text-lg font-medium">Years of Practice</label>
              <input
                type="number"
                name="yearsOfPractice"
                value={formData.yearsOfPractice}
                onChange={handleChange}
                min="0"
                required
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Marital Status */}
            <div>
              <label className="text-lg font-medium">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Institute */}
            <div>
              <label className="text-lg font-medium">Institute</label>
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="text-lg font-medium">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>

            {/* State of Practice */}
            <div>
              <label className="text-lg font-medium">State of Practice</label>
              <input
                type="text"
                name="stateOfPractice"
                value={formData.stateOfPractice}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium">Specialty</label>
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="text-lg font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Add dynamic fields for openings */}
          <div>
            <h3 className="text-lg font-medium">Openings</h3>
            {formData.openings.map((opening, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="date"
                  value={opening.day}
                  onChange={(e) =>
                    handleOpeningChange(index, "day", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Times (e.g., 9:00 AM, 1:00 PM)"
                  value={opening.times.join(", ")}
                  onChange={(e) =>
                    handleOpeningChange(
                      index,
                      "times",
                      e.target.value.split(",")
                    )
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOpening}
              className="text-blue-500 text-sm mt-2"
            >
              + Add Opening
            </button>
          </div>

          {/* Add dynamic languages */}
          <div>
            <h3 className="text-lg font-medium">Languages</h3>
            {formData.languages.map((language, index) => (
              <input
                key={index}
                type="text"
                value={language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                placeholder="Language"
                className="border p-2 rounded w-full mb-2"
              />
            ))}
            <button
              type="button"
              onClick={handleAddLanguage}
              className="text-blue-500 text-sm mt-2"
            >
              + Add Language
            </button>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            {isUploading ? "Uploading..." : "Create Therapist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TherapistCreate;

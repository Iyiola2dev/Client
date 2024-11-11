import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTherapistById, updateTherapist } from "@/store/therapist-slice"; // Assuming these actions exist
import { MdEdit } from "react-icons/md";

const TherapistCreation = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    ageRange: "",
    zodiacSign: "",
    languages: "",
    stateOfPractice: "",
    summary: "",
    degree: "",
    yearsOfPractice: "",
    institute: "",
  });

  const goBack = () => {
    window.history.back();
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch therapist data from the Redux store (presumed from your setup)
  const therapist = useSelector((state) => state.therapists.therapist);
  const loading = useSelector((state) => state.therapists.loading);
  const error = useSelector((state) => state.therapists.error);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        if (id) {
          console.log("Fetching therapist data from the server...");
          const resultAction = await dispatch(getTherapistById(id)).unwrap();
          // Save therapist data to localStorage
          localStorage.setItem("therapist", JSON.stringify(resultAction));
          setFormData(resultAction); // Ensure formData is updated with the fetched data
        }
      } catch (error) {
        console.error("Failed to fetch therapist data:", error);
      }
    };

    // Check if data exists in localStorage before fetching from the server
    const savedTherapist = localStorage.getItem("therapist");
    if (savedTherapist) {
      console.log(
        "Fetching therapist data from localStorage...",
        savedTherapist
      );
      setFormData(JSON.parse(savedTherapist));
    } else {
      fetchTherapist();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (therapist) {
      setFormData({
        firstName: therapist.firstName || "",
        lastName: therapist.lastName || "",
        email: therapist.email || "",
        mobileNumber: therapist.mobileNumber || "",
        dob: therapist.dob || "",
        gender: therapist.gender || "",
        maritalStatus: therapist.maritalStatus || "",
        ageRange: therapist.ageRange || "",
        zodiacSign: therapist.zodiacSign || "",
        languages: therapist.languages || "",
        stateOfPractice: therapist.stateOfPractice || "",
        summary: therapist.summary || "",
        degree: therapist.degree || "",
        yearsOfPractice: therapist.yearsOfPractice || "",
        institute: therapist.institute || "",
      });
    }
  }, [therapist]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (id) {
      dispatch(updateTherapist({ ...formData, _id: id }))
        .unwrap()
        .then(() => {
          setIsEditMode(false);
        })
        .catch((error) => {
          console.error("Failed to update therapist:", error);
        });
    }
  };

  return (
    <div>
      <div className="py-20 ">
        <div className="lg:hidden block ">
          <button onClick={goBack}>
            <FaArrowLeftLong className="pl-4 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>

        <div className="px-4 pt-4 lg:px-12">
          <div className="flex justify-between items-center mb-10">
            <p className="font-semibold">My Profile</p>
            <div>
              <p className="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md text-sm">
                Top up
              </p>
            </div>
          </div>

          <div className="flex justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl">
            <div className="flex gap-2 items-center pt-4">
              <img
                src={therapist?.imageUrl || ""}
                alt="therapist"
                className="lg:w-28 lg:h-28 rounded-full"
              />
              <div>
                <p className="font-bold text-lg">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm">{formData.stateOfPractice}, Nigeria</p>
              </div>
            </div>
            <button
              onClick={toggleEditMode}
              className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md"
            >
              <MdEdit className="text-blue-500" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              <p>Error fetching therapist data: {error}</p>
            </div>
          ) : (
            <div>
              {isEditMode ? (
                <div className="flex flex-col p-4 lg:p-6 border-2 border-slate-200 rounded-3xl mt-5">
                  {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-2">
                      <label htmlFor={key} className="font-semibold">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        :
                      </label>
                      <input
                        id={key}
                        name={key}
                        type="text"
                        placeholder={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  ))}
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col justify-between p-2 lg:p-6 border-2 border-slate-200 rounded-3xl mt-5">
                    <div className="flex justify-between pt-4">
                      <p className="font-semibold">Personal Information</p>
                      <button
                        onClick={toggleEditMode}
                        className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md"
                      >
                        <MdEdit className="text-blue-500" />
                      </button>
                    </div>

                    <div className="pt-4 space-y-2">
                      <React.Fragment>
                        <p className="font-semibold">First Name:</p>
                        <p>{formData.firstName}</p>

                        <p className="font-semibold">Last Name:</p>
                        <p>{formData.lastName}</p>

                        <p className="font-semibold">Email:</p>
                        <p>{formData.email}</p>

                        <p className="font-semibold">Mobile Number:</p>
                        <p>{formData.mobileNumber}</p>

                        <p className="font-semibold">Date of Birth:</p>
                        <p>{formData.dob}</p>

                        <p className="font-semibold">Gender:</p>
                        <p>{formData.gender}</p>

                        <p className="font-semibold">Marital Status:</p>
                        <p>{formData.maritalStatus}</p>

                        <p className="font-semibold">Age Range:</p>
                        <p>{formData.ageRange}</p>

                        <p className="font-semibold">Zodiac Sign:</p>
                        <p>{formData.zodiacSign}</p>

                        <p className="font-semibold">Languages:</p>
                        <p>
                          {formData.languages?.map((lang, index) => (
                            <React.Fragment key={index}>
                              {lang}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>

                        <p className="font-semibold">State of Practice:</p>
                        <p>{formData.stateOfPractice}</p>

                        <p className="font-semibold">Summary:</p>
                        <p>{formData.summary}</p>

                        <p className="font-semibold">Degree:</p>
                        <p>{formData.degree}</p>

                        <p className="font-semibold">Years of Practice:</p>
                        <p>{formData.yearsOfPractice}</p>

                        <p className="font-semibold">Institute:</p>
                        <p>{formData.institute}</p>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistCreation;

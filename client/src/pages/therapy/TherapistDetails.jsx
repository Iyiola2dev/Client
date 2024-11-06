import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTherapistById } from "@/store/therapist-slice";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineChair, MdOutlinePhoneInTalk } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { GiTripleYin } from "react-icons/gi";
import { TfiCreditCard } from "react-icons/tfi";
import { IoIosSchool } from "react-icons/io";
import TherapistProfile from "./OpenDisplay";

const TherapistDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors to get therapist data, loading status, and error message
  const therapist = useSelector((state) => state.therapists.therapist);
  const loading = useSelector((state) => state.therapists.loading);
  const error = useSelector((state) => state.therapists.error);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Opening modal, isModalOpen:", isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Closing modal, isModalOpen:", isModalOpen);
  };

  // Check that the component mounts properly
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  const numberToWords = (num) => {
    const words = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ];
    return words[num] || num.toString(); // Fallback to number if out of bounds
  };

  // Effect to fetch therapist data when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(getTherapistById(id));
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    return <p>{error.message || "An error occurred"}</p>;
  }

  console.log("Therapist data:", therapist);

  return (
    <div className="block lg:flex lg:justify-between px-10 bg-[#F5F5DC] ">
      {/* first part */}
      <div className="pt-8">
        <div className="block lg:hidden md:hidden">
          <button onClick={goBack} type="button">
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        <div className="">
          <div className="lg:flex justify-start gap-3">
            <div>
              <img
                src={therapist?.imageUrl || "/path-to-your-image.jpg"}
                alt="therapist"
                className="w-50 h-50 rounded-full lg:w-64 lg:h-64"
              />
            </div>

            <div>
              <div className="mt-4">
                <h2 className="text-3xl font-semibold text-gray-900 lg:text-4xl">
                  {therapist?.name || "Name not available"}
                </h2>
              </div>

              <div className="">
                <p className="text-md text-black lg:text-lg">
                  {therapist?.specialty || "Specialty not available"}
                </p>
              </div>

              <div className="">
                <p className="text-md text-blue-700 lg:text-lg">
                  E-mail: {therapist?.email || "Email not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <CiCalendar className="text-lg font-bold" />
              {therapist?.openings && therapist.openings.length > 0
                ? `${numberToWords(therapist.openings.length)} (${
                    therapist.openings.length
                  }) Openings This Week`
                : "No Openings This Week"}
            </p>
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <BiCoinStack className="text-lg font-bold" />5 Coins per Minute
              Audio Call Session
            </p>
            <p className="flex items-center gap-2 text-[15px] lg:text-lg">
              <MdOutlineChair className="text-lg font-bold" />
              {therapist?.therapyType || "Therapy type not available"}
            </p>
          </div>

          {/* buttons */}
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:gap-2 lg:items-center mb-6">
            <button
              type="button"
              className="text-sm lg:text-[16px] border border-blue-600 rounded-full px-4 py-1 lg:px-6 text-blue-600 w-fit"
            >
              {therapist?.maritalStatus}
            </button>
            <button
              type="button"
              className="flex items-center lg:text-[16px] text-md bg-blue-600 text-white rounded-full px-3 py-1 gap-1 w-fit"
            >
              <MdOutlinePhoneInTalk className="w-5 h-5 lg:w-6 lg:h-6" />
              Call Now
            </button>
            <button
              type="button"
              className="w-fit flex items-center lg:text-[16px] text-md bg-green-500 text-white rounded-full px-3 py-1 gap-1"
            >
              <BsChatDots className="w-5 h-5 lg:w-6 lg:h-6" />
              Chat Now
            </button>

            <div className="playfair-display-select block lg:hidden md:hidden md:mb-2 ">
              <p className="border py-2 px-6 border-slate-300 rounded-3xl md:text-sm mb-4 w-fit ">
                {therapist?.yearsOfPractice} Years in Practice
              </p>
              <p className="border py-2 px-6 border-slate-300 rounded-3xl md:text-sm w-fit ">
                Client age: {therapist?.clientAge}
              </p>
              <div>
                <button
                  type="button"
                  className="mt-4 border py-2 px-6 bg-gradient-to-r from-pink-400 via-blue-600 to-pink-600 rounded-3xl md:text-sm mb-4 w-fit text-white"
                  onClick={openModal}
                >
                  Book Appointment
                </button>
              </div>
            </div>
            <div className="playfair-display-select hidden lg:block md:block w-fit lg:ml-0 ml-5">
              <p className="border p-2 border-slate-300 rounded-3xl lg:py-1 text-md ">
                Client age: {therapist?.clientAge}
              </p>
            </div>
          </div>
        </div>
        {/* About Section and Other Sections */}
        <div className="lg:w-[40vw]">
          <div className="mt-12 flex items-center gap-2">
            <img
              src={therapist?.imageUrl || "/path-to-your-image.jpg"}
              alt="therapist"
              className="w-12 h-12 rounded-full lg:12 lg:h-12"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              About {therapist?.firstName || "Name not available"}
            </h3>
          </div>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <div>
            <p className="text-md text-black mt-4">
              Gender: {therapist?.gender || "Institute not available"}
            </p>
            <p className="text-md text-black mt-4">
              Age Range: {therapist?.ageRange}
            </p>
            <p className="text-md text-black mt-4 flex gap-1 items-center">
              Zodiac Sign: {therapist?.zodiacSign}{" "}
              <GiTripleYin className="text-blue-600" />
            </p>
            <p className="text-md text-black mt-4">
              {therapist?.summary || "Summary not available"}{" "}
            </p>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="text-center bg-blue-500 text-2xl text-white w-full font-bold p-6 rounded-t-3xl">
                Book An Appointment
              </div>
              <div className="flex flex-col items-start p-4 bg-white rounded-b-2xl">
                <p className="font-bold">
                  {therapist?.therapyType?.join(" / ")}
                </p>
                <p>
                  {therapist?.firstName} Is Available For On-Site Audio Calls
                </p>
                <div className="mt-8">
                  <TherapistProfile therapistId={therapist?._id} />
                </div>
                <div className="flex items-center justify-center gap-2 w-full mt-4 mb-8 text-lg">
                  <h3>Want Help Booking?</h3>
                  <h3 className="text-blue-600">
                    Call Us At (+234) 809 388 2468
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistDetails;

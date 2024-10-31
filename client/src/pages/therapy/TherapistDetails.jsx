import React, { useEffect } from "react";
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

const TherapistDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors to get therapist data, loading status, and error message
  const therapist = useSelector((state) => state.therapists.therapist);
  const loading = useSelector((state) => state.therapists.loading);
  const error = useSelector((state) => state.therapists.error);

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
      // Add more as needed for larger numbers
    ];
    return words[num] || num.toString(); // Fallback to number if out of bounds
  };

  // Effect to fetch therapist data when the component mounts or ID changes
  useEffect(() => {
    console.log("Therapist ID from URL:", id); // Debugging: log the therapist ID
    if (id) {
      dispatch(getTherapistById(id));
    }
  }, [dispatch, id]);

  // Debugging: log loading state and error message
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message); // Debugging: log the error message
    return <p>{error.message || "An error occurred"}</p>; // Display error message safely
  }

  // Debugging: log the therapist data received from the API
  console.log("Therapist data:", therapist);

  return (
    <div className="block lg:flex lg:justify-between lg:items-center px-4 bg-[#F5F5DC] ">
      {/* first part */}
      <div className="pt-8">
        {/* arrow */}
        <div className=" block lg:hidden md:hidden">
          <button onClick={goBack}>
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        {/* image and deets */}
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
              {therapist?.openings.length > 0
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
            <button className="text-sm lg:text-[16px] border border-blue-600 rounded-full px-4 py-1 lg:px-6 text-blue-600 w-fit">
              {therapist?.maritalStatus}
            </button>
            <button className="flex items-center lg:text-[16px] text-md bg-blue-600 text-white rounded-full px-3 py-1 gap-1 w-fit">
              <MdOutlinePhoneInTalk className="w-5 h-5 lg:w-6 lg:h-6" />
              Call Now
            </button>
            <button className="w-fit flex items-center lg:text-[16px] text-md bg-green-500 text-white rounded-full px-3 py-1 gap-1">
              <BsChatDots className="w-5 h-5 lg:w-6 lg:h-6" />
              Chat Now
            </button>

            {/* show only on small screen */}
            <div className="playfair-display-select block lg:hidden md:hidden md:mb-2 w-fit">
              <p className="border p-2 border-slate-300 rounded-3xl md:text-sm mb-4 ">
                {therapist?.yearsOfPractice} Years in Practice
              </p>
              <p className="border p-2 border-slate-300 rounded-3xl md:text-sm ">
                Client age: {therapist?.clientAge}
              </p>
            </div>
            {/* show on large and medium screen */}
            <div className="playfair-display-select hidden lg:block md:block  w-fit lg:ml-0 ml-5">
              <p className="border p-2 border-slate-300 rounded-3xl lg:py-1 text-md ">
                Client age: {therapist?.clientAge}
              </p>
            </div>
          </div>
        </div>
        {/* about */}
        <div className="lg:w-[40vw]">
          <div className="mt-12 flex items-center gap-2">
            <img
              src={therapist?.imageUrl || "/path-to-your-image.jpg"}
              alt="therapist"
              className="w-12 h-12 rounded-full lg:10 lg:h-10"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              About {therapist?.firstName || "Name not available"}
            </h2>
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
        {/* how to get coins */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 lg-text-xl font-semibold">
            <BiCoinStack className="w-6 h-6" />
            How To Get Coins To Pay For Sessions
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="text-md mt-2">How It Works</p>
          <ol className="list-decimal pl-6 font-medium">
            <li className="text-md mt-2">
              <strong>Select a Coin Package:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Choose From A Variety Of Packages That Fit Your Needs And
                Budget.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Make A Secure Payment:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Pay Using Your Preferred Payment Method Through Our Secure
                Checkout.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Instant Top-up:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Once Payment Is Complete, Your Account Will Be Instantly
                Credited With Your Talk Time Coins.
              </span>
            </li>
            <li className="text-md mt-2">
              <strong>Start Talking:</strong>
              <span className="font-normal list-item-text">
                {" "}
                Use Your Coins To Chat Or Call Without Interruptions.
              </span>
            </li>
          </ol>
        </div>
        {/* coins audio */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 lg-text-xl font-semibold  md:text-md">
            <TfiCreditCard className="w-6 h-6" />
            Coin Costs Per Audio Call / Messages Sessions
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <div className="flex flex-col lg:flex-row  gap-8 justify-start mt-6">
            <div className="space-y-3">
              <p>
                5 Coins / 1 Minute = <strong>₦1,000</strong>{" "}
              </p>
              <p>
                25 Coins / 5 Minutes = <strong>₦5,000</strong>{" "}
              </p>
              <p>
                50 Coins / 1= Minutes = <strong>₦10,000</strong>{" "}
              </p>
              <p>
                150 Coins / 30 Minutes = <strong>₦15,000</strong>{" "}
              </p>
              <p>
                300 Coins / 60 Minutes = <strong>₦20,000</strong>{" "}
              </p>
            </div>

            <div className="space-y-3">
              <p>
                5 Coins / 1 Message = <strong>₦100</strong>{" "}
              </p>
              <p>
                25 Coins / 5 Messages = <strong>₦500</strong>{" "}
              </p>
              <p>
                50 Coins / 10 Messages = <strong>₦1,000</strong>{" "}
              </p>
              <p>
                150 Coins / 30 Messages = <strong>₦1,500</strong>{" "}
              </p>
              <p>
                300 Coins / 60 Messages = <strong>₦2,000</strong>{" "}
              </p>
            </div>
          </div>
        </div>
        {/* education */}
        <div className="lg:w-[40vw] mt-10">
          <p className="flex items-center gap-2 md:text-md lg-text-xl font-semibold">
            <IoIosSchool className="w-6 h-6" />
            Education And Training
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="mt-4 font-semibold">Years In Practice</p>
          <p>{therapist?.yearsOfPractice} Years</p>
          <p className="mt-4 font-semibold">Graduating Institute</p>
          <p>{therapist?.institute}</p>
          <p className="mt-4 font-semibold">Graduating Degree</p>
          <p>{therapist?.degree}</p>
        </div>
        {/* additional details */}
        <div className="lg:w-[40vw] mt-10 ">
          <p className="flex items-center gap-1 md:text-md lg-text-xl font-semibold">
            <img
              src="https://t3.ftcdn.net/jpg/01/31/45/90/360_F_131459045_VJAQH4VTAz3Gb1yK9eFtJXKWhmr5XgHt.jpg"
              alt="therapist"
              className="w-10 h-10"
            />
            Additional Details
          </p>
          <hr className="w-50 h-[2px] bg-black mt-2" />
          <p className="mt-4 font-semibold">
            Languages Spoken By This Provider
          </p>
          {/* <p>{therapist?.languages.split(/(?=[A-Z])/).join("\n")}</p> 
          this works if the language value is a string */}
          {/* split the langauges in the array */}
          <p>
            {therapist?.languages?.map((lang, index) => (
              <React.Fragment key={index}>
                {lang}
                <br />
              </React.Fragment>
            ))}
          </p>

          <p
            className="mt-4 font-semibold
            "
          >
            State of Practice
          </p>
          <p className="pb-40">{therapist?.stateOfPractice}</p>
        </div>
      </div>

      {/* second part */}
      <div className="hidden lg:block"></div>
    </div>
  );
};

export default TherapistDetails;

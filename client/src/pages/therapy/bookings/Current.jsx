import Scheduling from "./Scheduling";
import Questionnaire from "./Questionnaire";
import { useNavigate } from "react-router-dom";

import { getTherapistById } from "@/store/therapist-slice";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { MdOutlineChair } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Confirmation from "./Confirmation";
import { toast } from "@/hooks/use-toast";


const Current = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const therapist = useSelector((state) => state.therapists.therapist);

  useEffect(() => {
    if (id) {
      dispatch(getTherapistById(id));
    }
  }, [id, dispatch]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formatDateTime = (dateString, timeString) => {
    // Parse the dateString and timeString separately
    const [year, month, day] = dateString.split("-").map(Number);
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format if necessary
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Create a new Date object using the parsed values
    const date = new Date(year, month - 1, day, hours, minutes);

    // Format the date and time
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Time zone abbreviation lookup
    const timeZoneAbbreviations = {
      "West Africa Standard Time": "WAT",
      "Central Standard Time": "CST",
      "Eastern Standard Time": "EST",
      "Pacific Standard Time": "PST",
      // Add more time zones as needed
    };

    // Get the full time zone name and map to abbreviation
    const fullTimeZone = date
      .toLocaleTimeString("en-US", { timeZoneName: "long" })
      .split(" ")
      .slice(2)
      .join(" ");
    const timeZone = timeZoneAbbreviations[fullTimeZone] || fullTimeZone;

    return `${weekday} | ${monthDay} - ${formattedTime} ${timeZone}`;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [isSchedulingComplete, setIsSchedulingComplete] = useState(false);
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false);
  const [isConfirmationComplete, setIsConfirmationComplete] = useState(false);

  const goBack = () => {
    if (currentStep === 1) {
      navigate(-2); // This will go back in browser history
    } else {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // Go back to previous step in the form
    }
  };

  //  const handleContinue = () => {
  //    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Advances to the next step up to a maximum of 3 to move to the next step regardless of the step’s completion
  //    // Scroll to the top of the page
  //    window.scrollTo(0, 0);
  //  };

  const handleContinue = () => {
    // Prevent moving to the next step if the current step is incomplete
    if (
      (currentStep === 1 && !isSchedulingComplete) ||
      (currentStep === 2 && !isQuestionnaireComplete) ||
      (currentStep === 3 && isConfirmationComplete)
    ) {
      toast({
        title: "Incomplete Step",
        description: "Please complete this step before moving to the next.",
        status: "error",
      });
      return;
    }

    window.scrollTo(0, 0);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  // Determine button label based on current step
  const getButtonLabel = () => {
    switch (currentStep) {
      case 1:
        return "Continue";
      case 2:
        return "Book Session";
      case 3:
        return "Buy Now";
      default:
        return "Continue";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5DC] pb-24">
      <div className="pt-8">
        <div className="block lg:pl-[5rem]">
          <button onClick={goBack} type="button">
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        {/* Step Indicator */}
        <div className="flex justify-center items-center mt-6 mb-8 mx-4 lg:mx-[20rem]">
          <div
            className={`flex flex-col items-center ${
              currentStep === 1 ? "text-blue-600 " : "text-gray-500"
            }`}
          >
            <div
              className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                isSchedulingComplete ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              {isSchedulingComplete && <span>&#10003;</span>}
            </div>
            <span className="text-sm lg:text-lg">Scheduling</span>
          </div>

          <div className="flex items-center justify-center mb-4 w-full">
            <hr className="w-6 h-1 lg:w-[10rem] bg-slate-400" />
          </div>

          <div
            className={`flex flex-col items-center ${
              currentStep === 2 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                isQuestionnaireComplete
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {isQuestionnaireComplete && <span>&#10003;</span>}
            </div>
            <span className="text-sm lg:text-lg">Questionnaire</span>
          </div>

          <div className="flex items-center justify-center mb-4 w-full">
            <hr className="w-6 h-1 lg:w-[10rem] bg-slate-400" />
          </div>

          <div
            className={`flex flex-col items-center ${
              currentStep === 3 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                currentStep === 3 || isConfirmationComplete
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {(currentStep === 3 || isConfirmationComplete) && (
                <span>&#10003;</span>
              )}
            </div>
            <span className="text-sm lg:text-lg">Confirmation</span>
          </div>
        </div>

        {/* header */}
        <div className=" flex flex-col items-center justify-center px-6">
          <p className="font-bold text-lg lg:text-2xl">
            Scheduling Your Sessions
          </p>
          <div className="flex flex-col items-center lg:hidden ">
            <p className="whitespace-pre-line">
              If you prefer to schedule your session
            </p>
            <p>over the phone, please call us at</p>
            <a href="tel:+2349035445277" className="text-blue-600">
              (+234) 903-544-5277
            </a>
          </div>
        </div>

        {/* image section */}
        <div className="bg-blue-200 py-8 px-4 lg:px-32 w-[100vw] mt-8">
          <div className="bg-white rounded-lg py-4 px-2 space-y-2 flex flex-col lg:flex-row lg:justify-between lg:px-6 lg:py-8  items-center">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <img
                src={therapist?.imageUrl || "https://via.placeholder.com/150"}
                alt="therapist"
                className="lg:w-40 lg:h-40 rounded-full"
              />
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 font-bold text-2xl ">
                  <p>{therapist?.firstName || "Therapist"}</p>
                  <p>{therapist?.lastName || "Unavailable"}</p>
                </div>
                <p className="text-center lg:text-start">
                  {therapist?.specialty || "Good Therapist"}
                </p>
                <div className="flex items-center lg:justify-start justify-center gap-2">
                  <MdOutlineChair className="text-blue-600 w-6 h-6" />
                  <span className="text-[15px] lg:text-[16px]">
                    {therapist?.therapyType
                      ?.join(", ")
                      .replace(/, ([^,]*)$/, " and $1") + " Therapy" ||
                      "Therapy type not available"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center ">
              {therapist?.openings?.[0] && (
                <div key={therapist.openings[0].day}>
                  {therapist.openings[0].times.map((time, index) => (
                    <p key={index}>
                      {formatDateTime(therapist.openings[0].day, time)}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-3 flex-col-reverse">
                <p className="text-blue-600 text-center">Change Time Slot</p>
                <div className="flex flex-col items-center justify-center font-semibold ">
                  <label>
                    <input
                      type="radio"
                      value="Option 1"
                      checked={selectedOption === "Option 1"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Audio Call
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="Option 2"
                      checked={selectedOption === "Option 2"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Chat Session
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex flex-col items-center justify-center">
          {currentStep === 1 && (
            <div>
              <Scheduling onComplete={setIsSchedulingComplete} />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <Questionnaire onComplete={setIsQuestionnaireComplete} />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <Confirmation onComplete={setIsConfirmationComplete} />
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white py-2 px-8 rounded-xl text-lg w-[24rem] lg:w-[51rem]"
          >
            {getButtonLabel()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Current;
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import Scheduling from "./Scheduling";
import Questionnaire from "./Questionnaire";
import { useNavigate } from "react-router-dom";

const Current = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleContinue = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5DC] pb-24">
      <div className="pt-8">
        <div className="block lg:hidden md:hidden">
          <button onClick={() => navigate(-1)} type="button">
            <FaArrowLeftLong className="mt-10 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        {/* Step Indicator */}
        <div className="flex justify-center items-center mt-6 mb-8 mx-4">
          <div
            className={`flex flex-col items-center ${
              currentStep === 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {currentStep >= 1 && <span>&#10003;</span>}
            </div>
            <span className="text-sm">Scheduling</span>
          </div>

          <div className="flex items-center justify-center mb-4 w-full">
            <hr className="w-6 h-1 bg-slate-400" />
          </div>

          <div
            className={`flex flex-col items-center ${
              currentStep === 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {currentStep >= 2 && <span>&#10003;</span>}
            </div>
            <span className="text-sm">Questionnaire</span>
          </div>
          <div className="flex items-center justify-center mb-4 w-full">
            <hr className="w-6 h-1 bg-slate-400" />
          </div>
          <div
            className={`flex flex-col items-center ${
              currentStep === 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {currentStep >= 3 && <span>&#10003;</span>}
            </div>
            <span className="text-sm">Confirmation</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex flex-col items-center justify-center">
          {currentStep === 1 && (
            <div>
              <Scheduling />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <Questionnaire/>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <p className="text-lg font-semibold">Confirm Your Information</p>
              {/* Confirmation details go here */}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white py-2 px-8 rounded-xl text-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Current;

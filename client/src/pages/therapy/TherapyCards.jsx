// import React from 'react'

// const TherapyCards = ({therapist}) => {
//      const { imageUrl, firstName, lastName, role, ageRange, zodiac } =
//        therapist;
//   return (
//     <div>
//       <img
//         src={imageUrl}
//         alt="Therapist Image"
//         className="border rounded-full object-cover"
//       />
//       {/* nfo */}
//       <div>
//         <p>
//           {firstName} {lastName}
//         </p>
//         <p>{role}</p>
//         <p>
//           <span></span>Age Range = {ageRange}
//         </p>
//         <p>
//           <span></span>Zodac Sign = {zodiac}
//         </p>
//         <p>
//           <span></span>
//           {category}
//         </p>
//       </div>

//       {/* optons */}
//       <div>
//         <Button className="bg-white border border-blue-600">Single</Button>
//         <Button>Call Now</Button>
//         <Button>Chat Now</Button>
//       </div>
//     </div>
//   );
// }

// export default TherapyCards

import React from "react";
import { FaArrowsAltH, FaPhoneVolume } from "react-icons/fa";
import { GiTripleYin } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import {  BsChatDots } from "react-icons/bs";
import { MdOutlinePhoneInTalk } from "react-icons/md";

export const TherapyCards = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 m-4 shadow-lg max-w-sm ">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <a href="/therapyDetials">
            <img
              src="/path-to-your-image.jpg"
              alt="therapist"
              className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
            />
          </a>
          {/* Online Indicator */}
          <span className="absolute top-2 right-1 w-4 h-4 bg-green-500 rounded-full border border-white"></span>
        </div>
      </div>

      {/* Therapist Info */}
      <div className="text-left mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Theo Sangodele</h2>
        <p className="text-md text-gray-600 font-semibold">
          Licensed Professional Counselor Of Sexual Health
        </p>
      </div>

      {/* Details */}
      <div className="text-sm font-semibold mb-4 space-y-2">
        <div className="flex items-center justify-start gap-2">
          <FaArrowsAltH className="text-blue-600" />
          <span>Age Range = 28 - 38</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <GiTripleYin className="text-blue-600" />
          <span>Zodiac Sign = Cancer</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IoBedOutline className="text-blue-600" />
          <span>Individual And Couple’s Therapy</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        <button className="text-xs border border-blue-600 rounded-full px-4 py-1 text-blue-600">
          Single
        </button>
        <button className="flex items-center text-xs bg-blue-600 text-white rounded-full px-3 py-1 gap-1">
          <MdOutlinePhoneInTalk className="w-3 h-3" />
          Call Now
        </button>
        <button className="flex items-center text-xs bg-green-500 text-white rounded-full px-3 py-1 gap-1">
          <BsChatDots className="w-3 h-3" />
          Chat Now
        </button>
      </div>

      {/* Book Button */}
      <div className="flex justify-center mb-4">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full px-6 py-1">
          Book Now
        </button>
      </div>

      {/* View Availability Link */}
      <div className="text-center">
        <a href="/therapyDetails" className="text-sm text-blue-600 underline">
          View Availability
        </a>
      </div>
    </div>
  );
};

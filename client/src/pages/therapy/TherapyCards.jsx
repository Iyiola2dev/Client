import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Include default calendar styles
import { FaArrowsAltH } from "react-icons/fa";
import { GiTripleYin } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import "../../index.css";

export const TherapyCards = ({ therapist }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter the time slots for the selected date
  const getTimeSlots = () => {

    // Check if there is a selected date and therapist's openings are defined
    if (selectedDate && therapist.openings) {
      // Convert the selected date to a simple date string for comparison
      const formattedSelectedDate = selectedDate.toISOString().split("T")[0];
      console.log("Formatted Selected Date:", formattedSelectedDate);

      // Find the openings for the selected date
      const openingForSelectedDate = therapist.openings.find(
        (opening) => opening.day === formattedSelectedDate
      );

      // If openings exist for this date, return the times
      if (openingForSelectedDate && openingForSelectedDate.times) {
        return openingForSelectedDate.times.map((time, index) => (
          <button
            key={index}
            className="py-2 px-4 rounded-md bg-gray-200 text-center hover:bg-blue-100"
          >
            {time}
          </button>
        ));
      }
    }
    // If no times are found, show a message
    return (
      <div className="col-span-4 text-center text-gray-500">
        No Available Slots
      </div>
    );
  };

  useEffect(() => {
    console.log("Therapist:", therapist);
  }, [therapist]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 m-4 shadow-lg lg:w-full lg:mx-9">
      <div className="flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-between">
        {/* Left Column: Therapist Details */}
        <div className="md:w-1/2 lg:w-1/2 lg:flex-row lg:mt-8">
          <div className="flex lg:flex-row flex-col justify-center md:justify-start mb-4">
            <div className="relative">
              <a href="/therapist/:id">
                <img
                  src={therapist.imageUrl || "/path-to-your-image.jpg"}
                  alt="therapist"
                  className="w-[150px] h-[150px] md:w-36 mb-4 md:h-36 rounded-full border-4 lg:w-[200px] lg:h-[200px] border-gray-300 object-cover lg:border-none mx-auto"
                />
              </a>
              {/* Online Indicator */}
              <span
                className={`absolute top-2 right-16 md:right-16 md:mr-6 lg:right-2 w-6 h-6 rounded-full border border-white ${
                  therapist.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>

            <div className="">
              {/* name and client age */}
              <div className="lg:flex gap-12">
                <div className="text-left ml-5 mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {therapist.name}
                  </h2>
                  <p className="text-md text-black">{therapist.specialty}</p>
                </div>

                <div className="hidden lg:block md:block md:mb-2 w-fit ml-5">
                  <p className="border p-2 border-black rounded-3xl md:text-sm ">
                    Client age: {therapist.clientAge}
                  </p>
                </div>
              </div>

              <div className="text-sm mb-4 space-y-2 lg:space-y-4 lg:ml-5">
                <div className="flex items-center justify-start gap-2">
                  <FaArrowsAltH className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    Age Range = {therapist.ageRange}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <GiTripleYin className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    Zodiac Sign = {therapist.zodiacSign}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <IoBedOutline className="text-blue-600" />
                  <span className="text-[15px] lg:text-[16px]">
                    {therapist.therapyType}
                  </span>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-2 mb-4">
                <button className="text-xs lg:text-[16px] border border-blue-600 rounded-full px-4 py-1 lg:px-6 text-blue-600">
                  {therapist.maritalStatus}
                </button>
                <button className="flex items-center lg:text-[16px] text-xs bg-blue-600 text-white rounded-full px-3 py-1 gap-1">
                  <MdOutlinePhoneInTalk className="w-3 h-3 lg:w-6 lg:h-6" />
                  Call Now
                </button>
                <button className="flex items-center lg:text-[16px] text-xs bg-green-500 text-white rounded-full px-3 py-1 gap-1">
                  <BsChatDots className="w-3 h-3 lg:w-6 lg:h-6" />
                  Chat Now
                </button>
              </div>

              <div className="flex justify-center md:justify-start mb-4">
                <a href="/therapist/:id">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white lg:text-[16px] lg:w-60 lg:ml-16 lg:mt-4 lg:px-2 lg:h-8 text-sm rounded-full px-6 py-1">
                    Book Now
                  </button>
                </a>
              </div>

              <div className="text-center md:text-left block md:hidden lg:hidden">
                <a
                  href="/therapyDetails"
                  className="text-sm lg:text-md text-blue-600 underline"
                >
                  View Availability
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Availability Calendar */}
        <div className="hidden md:flex md:flex-col md:w-1/2 items-center mt-8">
          {/* Calendar */}
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              // Check if therapist and availableDates are defined
              if (
                !therapist?.availableDates ||
                !Array.isArray(therapist.availableDates)
              ) {
                console.log("Available dates are not defined");
                return ""; // Return an empty string instead of null
              }

              // Log available dates for debugging
              therapist.availableDates.forEach((availableDate) => {
                console.log(
                  "Available Date:",
                  new Date(availableDate).toISOString()
                );
              });
              console.log("Current Tile Date:", date.toISOString());

              // Highlight dates where the therapist is available
              if (
                therapist.availableDates.some((availableDate) => {
                  const availableDateWithoutTime = new Date(availableDate)
                    .toISOString()
                    .split("T")[0];
                  const currentTileDateWithoutTime = date
                    .toISOString()
                    .split("T")[0];

                  console.log(
                    `Comparing: ${availableDateWithoutTime} with ${currentTileDateWithoutTime}`
                  );

                  return (
                    availableDateWithoutTime === currentTileDateWithoutTime
                  );
                })
              ) {
                console.log("Highlighting date:", date); // For debugging
                return "highlight-available"; // Highlight class for available dates
              }

              return ""; // Default return
            }}
          />

          {/* Time Slots for Selected Date */}
          {selectedDate && (
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 mt-4 text-sm">
              {getTimeSlots()}
            </div>
          )}

          {/* "More" Button */}
          <div className="playfair-display-select md:mt-12">
            <button className="mt-4 text-black border py-2 px-4 rounded-lg border-slate-300 ">
              More
            </button>
          </div>

          {/* "View Availability" Link */}
          <div className="text-center md:text-left md:mt-8 hidden lg:mt-6 md:block lg:block">
            <a
              href="/therapist/:id"
              className="text-sm lg:text-md text-blue-600 underline"
            >
              View Availability
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

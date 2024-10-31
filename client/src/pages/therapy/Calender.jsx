
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    // Calculate the week starting from Sunday to Saturday
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const week = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });

    setWeekDates(week);
  }, [currentDate]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const goToPreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  return (
    <div className="mt-5 bg-white mx-4 lg:mx-9 rounded-lg">
      {/* Responsive Text */}
      <p className="text-center text-sm py-2  lg:hidden md:hidden">
        3 Providers Found For Individual Therapy
      </p>

      <div className="hidden md:flex lg:flex justify-between items-center gap-12 px-8 py-2 playfair-display-select">
        <p className="lg:text-lg lg:font-medium md:text-[13px] md:font-medium mb-2">
          5 Providers Found For Individual Therapy
        </p>

        {/* Calendar Header */}
        <div className="flex items-center justify-between max-w-lg">
          <button
            onClick={goToPreviousWeek}
            className="text-xl cursor-pointer pl-2 font-medium"
          >
            <IoIosArrowBack />
          </button>

          {/* Calendar Days */}
          <div className="flex justify-between playfair-display-select px-4 text-xs md:text-xs gap-2 lg:text-md">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`text-center ${
                  isToday(date) ? "text-blue-500 font-bold" : ""
                }`}
              >
                <span className="block font-semibold">
                  {date
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase()}
                </span>
                <span>
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={goToNextWeek}
            className="text-xl cursor-pointer pr-2 font-bold"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

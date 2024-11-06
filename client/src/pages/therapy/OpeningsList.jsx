import React from 'react';
import "../../index.css";
import { MdOutlinePhoneInTalk } from 'react-icons/md';

const OpeningsList = ({ openings }) => {
  // Helper function to format date to something like "Monday, October 1st"
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="openings-list">
      {openings.map((opening, index) => (
        <div key={index} className="opening-day mb-4 playfair-display-select">
          <h2 className="text-lg font-medium mb-2">
            {formatDate(opening.day)}
          </h2>
          <div className="time-slots flex flex-wrap gap-2">
            {opening.times.map((time, idx) => (
              <div key={idx} className="time-slot-container ">
                <span className="time-slot px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm flex items-center gap-2">
                  {time}
                  <MdOutlinePhoneInTalk />
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};



export default OpeningsList;

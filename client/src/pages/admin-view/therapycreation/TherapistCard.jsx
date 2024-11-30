import React from "react";
import { useNavigate } from "react-router-dom";

const TherapistCard = ({ therapist }) => {
  const navigate = useNavigate();

  if (!therapist || !therapist._id) {
    return (
      <div className="text-red-500">Therapist data is missing or invalid.</div>
    );
  }

  const handleCardClick = () => {
    navigate(`/therapy/edit/${therapist._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col lg:flex-row justify-center gap-5 items-center lg:w-[500px]"
    >
      <div>
        <img
          src={therapist.imageUrl || "/path-to-your-default-image.jpg"}
          alt={`${therapist.firstName || "Unknown"}'s Profile`}
          className="w-[150px] h-[150px] md:w-36 md:h-36 lg:w-[200px] lg:h-[200px] mb-4 rounded-full border-4 border-gray-300 object-cover mx-auto"
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-bold">
          {therapist.firstName || "First Name"}{" "}
          {therapist.lastName || "Last Name"}
        </p>
        <p className="text-sm text-gray-500">
          {therapist.specialty || "Specialty not available"}
        </p>
      </div>
    </div>
  );
};

export default TherapistCard;

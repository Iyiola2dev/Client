import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTherapists } from "@/store/therapy/therapist-slice";
import TherapistCard from "./TherapistCard";

const Therapists = () => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    console.log("Fetching therapists...");
    dispatch(getAllTherapists()); // Dispatch the action to fetch therapists
  }, [dispatch]);

  // Log the therapists state for debugging purposes
  useEffect(() => {
    console.log("Therapists data:", therapists);
  }, [therapists]);

  if (loading) return <p className="text-center font-bold mt-12">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center py-20 ">
      <div className="grid grid-cols-2 gap-5">
        {Array.isArray(therapists) && therapists.length > 0 ? (
          therapists.map((therapist) => (
            <TherapistCard key={therapist._id} therapist={therapist} />
          ))
        ) : (
          <p>No therapists found.</p>
        )}
      </div>
    </div>
  );
};

export default Therapists;

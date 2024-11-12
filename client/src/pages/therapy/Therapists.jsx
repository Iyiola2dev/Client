
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TherapyCards } from "./TherapyCards";
import { getAllTherapists } from "@/store/therapist-slice";

const Therapists = () => {
  const dispatch = useDispatch();
  const { therapists, loading, error } = useSelector(
    (state) => state.therapists
  );

  useEffect(() => {
    dispatch(getAllTherapists());
  }, [dispatch]);

  if (loading) return <p className="text-center font-bold mt-12">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Check if therapists is an array before mapping
  return (
    <div className="flex flex-wrap gap-5 my-10 justify-center">
      {Array.isArray(therapists) && therapists.length > 0 ? (
        therapists.map((therapist) => (
          <TherapyCards key={therapist._id} therapist={therapist} />
        ))
      ) : (
        <p>No therapists found.</p>
      )}
    </div>
  );
};

export default Therapists;

import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTherapistById } from "@/store/therapist-slice";
import { MdEdit } from "react-icons/md";

const TherapistCreation = () => {
  const goBack = () => {
    window.history.back();
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const therapist = useSelector((state) => state.therapists.therapist);
  const loading = useSelector((state) => state.therapists.loading);
  const error = useSelector((state) => state.therapists.error);

  // Effect to fetch therapist data when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(getTherapistById(id));
    }
  }, [id]);

  return (
    <div>
      <div className="pt-20 ">
        {/* arrow to go back */}
        <div className="lg:hidden block ">
          <button onClick={goBack}>
            <FaArrowLeftLong className="pl-4 w-[40px] h-[20px] text-pink-500" />
          </button>
        </div>
        {/* body */}
        <div className="px-4 pt-4 lg:px-12">
          <div className="flex justify-between items-center mb-10">
            <p>My Profile</p>
            <div>
              <p className=" px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md text-sm">
                Top up
              </p>
            </div>
          </div>

          {/* image and name */}
          <div className="flex justify-between p-2 border-2 border-slate-200 rounded-3xl">
            <div className="flex gap-2 items-center pt-4">
              <div>
                <img
                  src={therapist?.imageUrl || ""}
                  alt="therapist"
                  className=" lg:w-28 lg:h-28 rounded-full"
                />
              </div>
              <div>
                <p className="font-bold text-lg">
                  {therapist?.firstName} {therapist?.lastName}
                </p>
                <p className="text-sm">{therapist?.stateOfPractice}, Nigeria</p>
              </div>
            </div>
            <div className="w-12 h-6 flex items-center justify-center border-2 border-slate-200 rounded-lg shadow-md">
              <p className=" text-blue-500 ">
                <MdEdit />
              </p>
            </div>
          </div>
          {/* body */}
        </div>
      </div>
    </div>
  );
};

export default TherapistCreation;

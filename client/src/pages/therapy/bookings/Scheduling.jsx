import { getTherapistById } from "@/store/therapist-slice";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineChair } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Scheduling = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col items-center justify-center  bg-[#F5F5DC]">
     
        

        {/* body */}
        <div className="">
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

          {/* header2 */}
          <div className="flex flex-col items-center justify-center  pt-8 px-6 gap-2 ">
            <div className=" flex flex-col items-center justify-center lg:block lg:w-[60vw]">
              <p className="text-2xl font-semibold">Responsible Party</p>
              <p className="text-lg text-center lg:text-start pt-2 font-semibold">
                This person will be paying for services
              </p>
              <p className="text-center lg:hidden">
                <strong>Just a heads up:</strong> If you are creating an
                account, you must be 18 years or older. For minors you muct have
                a parent or legal guardian listed as the responsible party.
              </p>
            </div>
          </div>

          {/* form */}
          <div className="flex flex-col items-center justify-center pt-8 px-4">
            <form className="flex flex-col gap-6 items-center justify-center lg:block lg:w-[60vw]">
              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="accountName">
                  Account Name
                </label>
                <input
                  id="accountName"
                  type="text"
                  placeholder="Name used in creating the account"
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+234 1234567890"
                    className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                    pattern="^\+\d{1,4}\s\d{7,12}$"
                    required
                  />
                </div>
                <small className="text-xs text-gray-500">
                  Format: +CountryCode PhoneNumber (e.g., +234 1234567890)
                </small>
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email used in creating account"
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="font-semibold" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full">
                <div className="space-y-2 w-full">
                  <label className="font-semibold" htmlFor="appointmentDate">
                    Date
                  </label>
                  <input
                    id="appointmentDate"
                    type="date"
                    className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="font-semibold" htmlFor="appointmentTime">
                    Time
                  </label>
                  <input
                    id="appointmentTime"
                    type="time"
                    className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="font-semibold" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="State"
                    className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="font-semibold" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* condition */}
          <div className="flex  items-center justify-center pt-8 px-4 h-full mt-8 mb-10">
            <div className="flex  gap-6 items-center justify-center lg:w-[60vw] border rounded-3xl p-4 lg:p-6 bg-gray-300">
              <div className="mb-[12rem] lg:mb-20">
                <RiErrorWarningLine className="w-8 h-8 bg-blue-600 text-white rounded-full" />
              </div>
              <div>
                <p>
                  By providing your phone number, you agree to receive text
                  messages from Allsextoys for administrative and commercial
                  purposes. Message and data rates may apply. <br />
                  Message frequency varies. <br /> Opt-out of text notifications
                  anytime by replying STOP.
                </p>
                <p className="hidden lg:flex">Mobile Terms and Conditions.</p>
              </div>
            </div>
          </div>
        </div>
        {/* body */}
      </div>
    
  );
};

export default Scheduling;

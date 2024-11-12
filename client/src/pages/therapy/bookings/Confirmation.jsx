import React from "react";

const Confirmation = () => {
  return (
    <div className="flex py-14 px-3 items-center justify-center bg-[#F5F5DC]">
      <div className="bg-black text-white flex flex-col py-8 px-3 w-[95vw] rounded-xl">
        <div>
          <p className="text-lg underline">Promotions</p>
        </div>

        {/* two cards */}
        <div className="grid grid-cols-2">
            <div className="bg-gray-500 p-4 ">
                <p></p>
            </div>
            <div></div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

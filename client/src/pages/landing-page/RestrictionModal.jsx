import restrictImage from "../../assets/images/restrict.svg";

const RestrictionModal = ({ onClose }) => {
  return (
    <div className="border-2 rounded-2xl w-[500px] h-auto bg-gray-500 bg-opacity-50">
      <div className="flex flex-col px-2 py-6 justify-center items-center gap-4 text-white">
        <img src={restrictImage} alt="restrict" width={150} height={100} />
        <p className="text-4xl font-bold">Warning</p>
        <p className="text-2xl font-semibold">This site is for adults only!</p>
        <p className="text-xl">
          The contents of this site are available only to adults.
        </p>
        <p className="text-lg text-center">
          If you want to continue and have the legal age in your country, please
          click on the confirm button to continue, otherwise click on exit.
        </p>
        <button className="text-xl bg-gradient-to-r from-pink-500 via-blue-600 to-pink-600 py-1 px-10 rounded-md">
          I am 18+ years old <br />
          <span className="text-2xl font-semibold">Enter</span>
        </button>
        {/* Call onClose prop when you want to close the modal */}
        <button
          className="text-red-500 font-semibold text-3xl"
          onClick={onClose}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default RestrictionModal;

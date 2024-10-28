import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {  IoCloseSharp, IoHome, IoPerson } from "react-icons/io5";
import {  MdConnectWithoutContact, MdOutlineChair, MdOutlineMenuBook } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   // Toggle the dropdown visibility
   const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };

   // Close dropdown after selecting a course
   const handleCourseClick = () => {
     setIsDropdownOpen(false);
   }; 

  return (
    <div>
      {/* This is the navigation bar desktop view */}
      {/* This is the gradient colour for the page ( bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] )*/}
      <div className="fixed top-0 left-0 right-0 z-50 hidden lg:flex flex-col bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full ">
        <div className=" flex w-full items-center gap-[15rem] px-10 py-3">
          <img
            className="h-[4rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />

          <div className="relative flex items-center ">
            <Input className="w-[500px] bg-black text-white" />
            {/* Magnifying Glass Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-1 h-9 w-9 text-white bg-blue-500 p-2 font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>
        {/* The navigation sessions to each pages on the website */}
        <div className="bg-black w-full  ">
          <nav className="pl-[4rem] w-full pr-10 py-3 flex items-center justify-between">
            <ul className="flex gap-5 w-full p-3">
              <li className="text-white hover:text-[#C42571]">
                <Link to="/">Home</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/about">About Us</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/products">Our products (+18 only)</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/therapy">Therapy</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="text-white hover:text-[#C42571]">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>

            <div className="flex gap-4 w-[35%]">
              {/* The button component is from shacdn */}
              <Button className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)]  w-full text-white">
                <Link>Sign Up</Link>
              </Button>
              <Button className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)]  w-full text-white">
                <Link>Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 ">
        <div
          className="flex items-center justify-between p-4"
          style={{ backgroundColor: "#FAF1DC" }}
        >
          <button onClick={toggleMenu} className="text-black">
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <img
            className="h-[3rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />
        </div>

        {/* Sidebar Navigation */}
        <div
          className={`fixed top-0 left-0 h-full w-[75vw] bg-black text-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } border rounded-tr-2xl`}
        >
          <div className="flex flex-col h-full p-3">
            {/* App logo */}
            <div className="flex justify-between gap-2 items-center mb-12">
              <img
                className="h-[3rem]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
                alt="App-logo"
              />

              {/* Search Bar */}
              <div className="relative flex items-center w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search anything....."
                  className="w-full pl-8 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {/* Magnifying Glass Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>

              <button
                onClick={toggleMenu}
                className="text-white self-end mb-2 bg-slate-600 p-2 rounded-full font-semibold"
              >
                {/* Close Icon */}
                <IoCloseSharp />
              </button>
            </div>

            <nav className="flex flex-col gap-4 pl-4 text-md">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <IoHome className="w-6 h-6" />
                <span>Home</span>
              </Link>

              <Link
                to="/therapy/appointment"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <MdOutlineChair className="w-6 h-6" />
                Book Appointment
              </Link>
              <div>
                <Link
                  to="#"
                  className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                  onClick={toggleDropdown}
                >
                  <MdOutlineMenuBook className="w-6 h-6" />
                  Courses
                  {isDropdownOpen ? (
                    <IoIosArrowUp className="w-4 h-4 ml-4" />
                  ) : (
                    <IoIosArrowDown className="w-4 h-4 ml-4" />
                  )}
                </Link>

                {isDropdownOpen && (
                  <div className="ml-6 mt-2 text-sm flex flex-col">
                    <Link
                      to="/courses/course1"
                      className="hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                      onClick={handleCourseClick}
                    >
                      Course 1
                    </Link>
                    <Link
                      to="/courses/course2"
                      className="hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                      onClick={handleCourseClick}
                    >
                      Course 2
                    </Link>
                    <Link
                      to="/courses/course3"
                      className="hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                      onClick={handleCourseClick}
                    >
                      Course 3
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <IoPerson className="w-6 h-6" />
                Profile
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <MdConnectWithoutContact className="w-6 h-6" />
                Contact Us
              </Link>
            </nav>

            <div className="flex flex-col pl-4 gap-4 text-sm mt-[50px]">
              <Link
                to="/help"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <FaRegQuestionCircle className="w-5 h-5" />
                Help
              </Link>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 hover:text-[#3525c4] hover:bg-white hover:font-semibold p-2"
                onClick={toggleMenu}
              >
                <CiLogout className="w-5 h-5" />
                Log out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

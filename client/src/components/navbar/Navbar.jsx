import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* This is the navigation bar desktop view */}
      {/* This is the gradient colour for the page ( bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] )*/}
      <div className="hidden lg:flex flex-col bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full ">
        <div className=" flex w-full items-center gap-[5rem] px-10 py-3">
          <img
            className="h-[4rem]"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png"
            alt="App-logo"
          />

          <Input className="w-[500px] bg-black text-white" />
        </div>
        {/* The navigation sessions to each pages on the website */}
        <div className="bg-black w-full  ">
          <nav className="pl-[4rem] w-full pr-10 py-3 flex items-center justify-between">
            <ul className="flex gap-5 w-fit p-3">
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

            <div className="flex gap-4 ">
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
      <div className="lg:hidden">
        <div className=" flex items-center justify-between bg-black p-4">
          <button onClick={toggleMenu} className="text-white">
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
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-5">
            <button onClick={toggleMenu} className="text-white self-end mb-5">
              {/* Close Icon */}
              <IoCloseSharp />
            </button>

            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                to="/products"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Our products (+18 only)
              </Link>
              <Link
                to="/courses"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link
                to="/therapy"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Therapy
              </Link>
              <Link
                to="/blog"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#C42571]"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </nav>

            <div className="flex flex-col gap-4 mt-10">
              <Button className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full text-white">
                <Link to="/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
              <Button className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-full text-white">
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

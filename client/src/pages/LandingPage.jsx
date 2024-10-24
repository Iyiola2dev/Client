import React from "react";
// import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <main className="flex items-center justify-center min-h-full flex-wrap">
        <div className="flex-1 flex justify-center ">
          <img
            className="w-full max-w-sm lg:max-w-lg xl:max-w-3xl h-auto aspect-square object-cover"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729744723/Mern-Ecommerce/side-view-smiley-doctor-work_1_lk12o1.png"
            alt="Smiley Doctor"
          />
        </div>
        <div className="flex-1 flex justify-center ">
          <img
            className="w-full max-w-sm lg:max-w-lg xl:max-w-3xl h-auto aspect-square object-cover"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729744713/Mern-Ecommerce/giphy_1_shxv3d.png"
            alt="Animated Image"
          />
        </div>
      </main>

      {/* second section on the landing page */}
      <section className="p-5 mt-5 flex flex-col justify-center items-center text-center">
        <h2 className="font-bold " >We make therapy work better for everyone</h2>

        <div className=" mt-5 flex flex-col md:flex-row gap-3 justify-center  items-center lg:justify-between w-full">
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px] ">
            <img
              className="h-[150px] w-[150px]"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729775941/Mern-Ecommerce/image_132_bmtsz8.png"
              alt="landing page image1"
            />
            <p>
              Work with providers who are supported & empowered to provide the
              very best care.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px]">
            
            <img
              className="h-[150px] w-[150px]"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729775940/Mern-Ecommerce/round_the_clock_mfzwar.png"
              alt="landing page image2"
            />
            <p>
              Get help when & where you need it — within 7 days of scheduling,
              24/7 live chat booking online
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px]">
          <div  className="h-[150px] w-[150px]"><img
              className="h-[150px] w-[150px]"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729775940/Mern-Ecommerce/image_133_jnxd8a.png"
              alt="landing page image3"
            /></div>
            
            <p>
              Cover the cost of your session with our talk time unit plan,
              Self-pay options are also available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

import { Button } from "@/components/ui/button";

import { IoStarSharp } from "react-icons/io5";
import LandingQuestion from "./LandingQuestion";
import { Link } from "react-router-dom";
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
          <Link to="/shop/home">
          <img
            className="w-full max-w-sm lg:max-w-lg xl:max-w-3xl h-auto aspect-square object-cover"
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729744713/Mern-Ecommerce/giphy_1_shxv3d.png"
            alt="Animated Image"
          /></Link>
         
        </div>
      </main>

      {/* second section on the landing page */}
      <section className="p-5 mt-5 flex flex-col justify-center items-center text-center">
        <h2 className="font-bold lg:text-xl">
          We make therapy work better for everyone
        </h2>

        <div className=" mt-5 flex flex-col md:flex-row gap-3 justify-center  items-center lg:justify-between w-full lg:text-lg ">
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px] lg:w-[350px] lg:h-[300px] gap-3 ">
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
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px] lg:w-[350px] lg:h-[300px] gap-3">
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
          <div className="flex flex-col justify-center items-center w-[250px] px-4 h-[250px] lg:w-[350px] lg:h-[300px] gap-3">
            <div className="h-[150px] w-[150px]">
              <img
                className="h-[150px] w-[150px]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729775940/Mern-Ecommerce/image_133_jnxd8a.png"
                alt="landing page image3"
              />
            </div>

            <p>
              Cover the cost of your session with our talk time unit plan,
              Self-pay options are also available.
            </p>
          </div>
        </div>
      </section>

      {/* Third section  on the landing page*/}
      <section className="p-4 md:p-7 mt-5 flex flex-col justify-center items-center text-center">
        <h2 className="font-bold text-lg md:text-xl">Therapy category</h2>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:text-lg p-2">
          {/* Couples Therapy */}
          <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2">
            <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2 w-full">
              <img
                className="w-full h-auto max-w-[300px]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729782989/Mern-Ecommerce/Rectangle_25_xqygev.png"
                alt="Couple-image"
              />
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-semibold">
                  Couples Therapy
                </h3>
                <p className="min-h-[80px] max-w-[300px]">
                  Couples strengthening bonds & resolving conflicts. Support us
                  to grow our relationship.
                </p>
                <Button className="rounded-full bg-white border-2 text-black mt-2">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          {/* Individual Therapy */}
          <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2">
            <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2 w-full">
              <img
                className="w-full h-auto max-w-[300px]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729782980/Mern-Ecommerce/sex_consultations_u1utm2.png"
                alt="Sex consultation-image"
              />
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-semibold">
                  Individual Therapy
                </h3>
                <p className="min-h-[80px] max-w-[300px]">
                  Personalized therapy for self-growth. Support myself.
                </p>
                <Button className="rounded-full bg-white border-2 text-black mt-2">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          {/* Teens Therapy */}
          <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2">
            <div className="flex flex-col justify-center items-center p-4 lg:p-6 border-2 w-full">
              <img
                className="w-full h-auto max-w-[300px]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729782973/Mern-Ecommerce/teen_theraphy_cdakj2.png"
                alt="Teen therapy image"
              />
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-semibold">
                  Teens Therapy
                </h3>
                <p className="min-h-[80px] max-w-[300px]">
                  Guidance for adolescent challenges. Supporting your child.
                </p>
                <Button className="rounded-full bg-white border-2 text-black mt-2">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth section of the page */}
      <section className="p-5 mt-5 flex flex-col justify-center items-center  ">
        {/* first div */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-black text-white p-5 rounded-xl">
          <span>
            <img
              className="w-full h-auto"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729790149/Mern-Ecommerce/unsplash_I8gQVrDcXzY_pgzruc.png"
              alt=""
            />
          </span>
          <span className="flex flex-col gap-4 p-5">
            <h2 className="font-bold text-xl lg:text-3xl text-center">
              Are you a teen feeling sad and confused about life?
            </h2>
            <p className="text-center  lg:text-xl">
              It’s okay to feel overwhelmed sometimes. Life can get tough,
              especially when you’re dealing with school, friends, family, and
              figuring out who you are. If you’re feeling lost or like no one
              understands, you're not alone. Our therapy sessions are here to
              provide a helping hand when things seem too heavy to carry on your
              own.
            </p>
          </span>
        </div>

        {/* second div */}
        <div className="flex flex-col justify-center items-center mt-5 p-5 max-w-lg text-center gap-5">
          <h3 className="font-bold text-2xl md:text-3xl">
            How to buy our talk time unit plan
          </h3>
          <p className="text-xl ">
            Running out of talk time? Don’t let the conversation end! With our
            simple and secure Coin Unit Plan, you can purchase more talk time
            and keep the conversation going connecting with our professionals.
          </p>
        </div>

        {/* third div */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-black text-white p-5 rounded-xl mt-5">
          <span className="flex flex-col gap-4 p-5">
            <h2 className="font-bold text-xl lg:text-3xl text-center">
              Are you feeling overwhelmed by life’s challenges and struggling to
              find clarity?
            </h2>
            <p className="text-center  lg:text-xl">
              Life can sometimes feel confusing, and even exhausting. Whether
              it’s career stress, relationship struggles, or simply navigating
              the uncertainty of everyday life, it’s normal to feel stuck or
              down. If you’re feeling lost or weighed down, our therapy sessions
              are here to help you make sense of it all and regain control.
            </p>
          </span>
          <span>
            <img
              className="w-full h-auto"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729790289/Mern-Ecommerce/Rectangle_25_m2t0k1.png"
              alt="image"
            />
          </span>
        </div>

        {/* fourth div */}
        <div className="flex flex-col justify-center items-center mt-5 p-5 max-w-xl text-center gap-5">
          <h3 className="font-bold text-2xl md:text-3xl">Disclaimer!</h3>
          <p className="text-center  lg:text-xl">
            No live chat for assistance on the site Fill out questionnaire
            *Religion *Gender *Relationship status * What are you seeking help
            for ? Options available Your sex life, differences with your spouse,
            divorce, adoption, infertility, infidelity, pregnancy, postpartum
            depression,others (allow a client to put in the reason)
          </p>
        </div>
        <Button className="mt-5">Meet some of our THERAPIST</Button>
      </section>

      {/* fifth section */}
      <section className="flex flex-col md:flex-row gap-4 justify-center items-center mt-5 p-5">
        <div className="bg-black max-w-[20rem] lg:max-w-lg xl:max-w-xl h-auto p-4">
          <img
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729790293/Mern-Ecommerce/unsplash_5CoDz0mCcXU_ez7aiu.png"
            alt=""
          />

          <span className="text-white">
            <p>Theo sangodele</p>
            <p>Licensed professional for sexual health</p>
          </span>
          <span className="flex gap-2 items-center text-[gold]">
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
          </span>
        </div>
        <div className="bg-black max-w-[20rem] lg:max-w-lg xl:max-w-xl h-auto  p-4">
          <img
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729840845/Mern-Ecommerce/unsplash_5CoDz0mCcXU_c8wstq.png"
            alt=""
          />
          <span className="text-white">
            <p>Theo sangodele</p>
            <p>Licensed professional for sexual health</p>
          </span>
          <span className="flex gap-2 items-center text-[gold]">
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
          </span>
        </div>
      </section>

      {/* last section */}
      <section>
        <LandingQuestion/>
      </section>
    </div>
  );
};

export default LandingPage;

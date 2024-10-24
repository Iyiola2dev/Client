import React from 'react'
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
<section>
  <h2>We make therapy work better for everyone</h2>

  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</section>
     
    </div>
  )
}

export default LandingPage
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <main className='flex items-center min-h-full '>
        <div className='flex-1 h-full'>
          <img className='w-full max-w-sm object-cover object-center ' src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729744723/Mern-Ecommerce/side-view-smiley-doctor-work_1_lk12o1.png" alt="Smiley Doctor" />
        </div>
        <div className='flex-1'>
        <img className='w-full max-w-sm object-cover' src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729744713/Mern-Ecommerce/giphy_1_shxv3d.png" alt="Animated Image" />
        </div>
      </main>
     
    </div>
  )
}

export default LandingPage
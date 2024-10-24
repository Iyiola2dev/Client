import React from 'react'
import { Input } from '../ui/input'

const Navbar = () => {
  return (
    <div >
      {/* This is the navigation bar desktop view */}
      <div className='bg-white w-full px-10 py-5'>
      <div className=' flex justify-between items-center'>
       <img className='h-[5rem]' src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729737624/Mern-Ecommerce/ALLSEXTOYS_PNG_WHITE_1_meard7.png" alt="App-logo" />

       <Input className="w-[45%]"/>
      </div>
      <div className='bg-black'></div>
    </div>
    </div>
  )
}

export default Navbar
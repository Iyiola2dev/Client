import React from 'react'
import ShoppingHeader from './Header'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <ShoppingHeader/>
        <div>Man</div>
        <div className='flex flex-col w-full '></div>
    </div>
  )
}

export default ShoppingLayout
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    //this is the admin dashboard sidebar
  return (
    <div className='flex min-h-screen w-full'>
    {/* admin sidebar */}
    <div className='flex flex-1 flex-col'>
        {/* admin header */}
        <div></div>
    </div>
    <div></div>
</div>
  )
}

export default  AdminLayout
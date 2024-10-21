import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminHome from './AdminHome'

const Admin = () => {
  return (
    <div>
        <h1>Admin Dashboard</h1>
        <Routes>
            <Route path="/" element={<Navigate to="/admin/adminHome"/>}/>
            <Route path='/adminHome' element={<AdminHome/>}/>
        </Routes>
    </div>
  )
}

export default Admin
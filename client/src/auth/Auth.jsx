import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Navigate to="/auth/login"/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
  )
}

export default Auth